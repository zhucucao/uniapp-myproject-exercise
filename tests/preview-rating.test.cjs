const assert = require('node:assert/strict')
const fs = require('node:fs')
const path = require('node:path')
const test = require('node:test')
const vm = require('node:vm')
const ts = require('typescript')
const { parse } = require('@vue/compiler-sfc')
const { ref, computed, unref } = require('vue')
const { createPinia, storeToRefs } = require('pinia')

function createSubmission() {
  const filename = path.join(__dirname, '../src/pages/xianxiami/xxx-preview/xxx-preview.vue')
  const { descriptor } = parse(fs.readFileSync(filename, 'utf8'))
  const source = ts.createSourceFile('preview.ts', descriptor.scriptSetup.content, ts.ScriptTarget.Latest, true)
  let handler
  ts.forEachChild(source, (statement) => {
    if (ts.isVariableStatement(statement)) {
      handler ??= statement.declarationList.declarations.find(item => item.name.getText(source) === 'addScore')?.initializer
    }
  })
  assert.ok(handler, 'The preview page must define addScore')
  const { outputText } = ts.transpileModule(`const addScore = ${handler.getText(source)}; addScore`, {
    compilerOptions: { target: ts.ScriptTarget.ES2020 },
  })
  const records = []
  const requests = []
  let resolveRequest
  const response = new Promise(resolve => { resolveRequest = resolve })
  const giveScore = ref(3.5)
  const context = {
    console: { log() {} },
    ref,
    giveScore,
    hasScored: ref(false),
    currentWallpaper: ref({ _id: 'wallpaper-a', classid: 'category-a' }),
    submiting: ref(false),
    infoScorePopup: ref({ close() {} }),
    wallpaperStore: { addScoredWallpaperList(record) { records.push(record) } },
    requestSetupScore(...args) { requests.push(args); return response },
  }
  return {
    run: vm.runInNewContext(outputText, context),
    giveScore,
    records,
    requests,
    succeed() { resolveRequest({ errCode: 0, data: { id: 'rating-record-a' } }) },
  }
}

test('saves the submitted wallpaper ID instead of the response rating-record ID', async () => {
  const submission = createSubmission()
  const pending = submission.run()
  submission.succeed()
  await pending
  assert.equal(submission.records.length, 1)
  assert.equal(submission.records[0].id, 'wallpaper-a')
})

test('saves the submitted score even if the input changes while awaiting the API', async () => {
  const submission = createSubmission()
  const pending = submission.run()
  submission.giveScore.value = 5
  submission.succeed()
  await pending
  assert.deepEqual(submission.requests, [['category-a', 'wallpaper-a', 3.5]])
  assert.equal(submission.records[0].score, 3.5)
})

function createPreview(records = []) {
  const storeFile = path.join(__dirname, '../src/store/wallpaper.ts')
  const storeCode = ts.transpileModule(fs.readFileSync(storeFile, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
  }).outputText
  const storeExports = {}
  vm.runInNewContext(storeCode, { exports: storeExports, require })
  const store = storeExports.useWallpaperStore(createPinia())
  store.setList(['a', 'b'].map(id => ({
    _id: `wallpaper-${id}`, classid: 'category-a', score: '4.2',
    smallPicurl: `${id}_small.webp`, description: '', nickname: '', tabs: [],
  })))
  records.forEach(record => store.addScoredWallpaperList(record))
  const filename = path.join(__dirname, '../src/pages/xianxiami/xxx-preview/xxx-preview.vue')
  const { descriptor } = parse(fs.readFileSync(filename, 'utf8'))
  const source = ts.createSourceFile('preview.ts', descriptor.scriptSetup.content, ts.ScriptTarget.Latest, true)
  const script = source.statements.filter(statement => !ts.isImportDeclaration(statement))
    .map(statement => statement.getText(source)).join('\n')
  const hooks = []
  const requests = []
  const context = vm.createContext({
    ref, computed, unref, storeToRefs,
    console: { log() {} },
    definePage() {},
    onLoad(callback) { hooks.push(callback) },
    useWallpaperStore() { return store },
    requestSetupScore(...args) {
      requests.push(args)
      return Promise.resolve({ errCode: 0, data: { id: 'rating-record-a' } })
    },
  })
  vm.runInContext(ts.transpileModule(script, {
    compilerOptions: { target: ts.ScriptTarget.ES2020 },
  }).outputText, context)
  const page = vm.runInContext('({ giveScore, hasScored, swiperChange, openScorePop, addScore, infoScorePopup })', context)
  page.infoScorePopup.value = { open() {}, close() {} }
  hooks.forEach(callback => callback())
  const bottomText = descriptor.template.content.match(/@click="openScorePop"[\s\S]*?<text>([\s\S]*?)<\/text>/)[1]
  return {
    ...page, store, requests,
    bottomLabel() {
      const scope = vm.runInContext(`({
        giveScore: unref(giveScore), hasScored: unref(hasScored),
        currentScoreRecord: typeof currentScoreRecord === 'undefined' ? undefined : unref(currentScoreRecord)
      })`, context)
      return bottomText.replace(/\{\{([\s\S]*?)\}\}/g, (_, expression) => vm.runInNewContext(expression, scope))
    },
  }
}

test('switching from a rated wallpaper to an unrated one resets the draft, and switching back restores it', () => {
  const page = createPreview([{ id: 'wallpaper-a', score: 4.5 }])
  assert.equal(page.giveScore.value, 4.5)
  page.swiperChange({ detail: { current: 1 } })
  assert.equal(page.giveScore.value, 0)
  assert.equal(page.hasScored.value, false)
  page.swiperChange({ detail: { current: 0 } })
  assert.equal(page.giveScore.value, 4.5)
  assert.equal(page.hasScored.value, true)
})

test('the bottom label shows only a saved rating, not an unsubmitted draft', () => {
  const page = createPreview()
  page.giveScore.value = 3.5
  assert.equal(page.bottomLabel(), '评分')
  page.openScorePop()
  assert.equal(page.giveScore.value, 0)
})

test('rating A, switching to B, and returning to A preserves the correct label and prevents rating A again', async () => {
  const page = createPreview()
  page.giveScore.value = 4.5
  await page.addScore()
  assert.equal(page.bottomLabel(), '4.5分')
  page.swiperChange({ detail: { current: 1 } })
  assert.equal(page.bottomLabel(), '评分')
  assert.equal(page.hasScored.value, false)
  page.swiperChange({ detail: { current: 0 } })
  page.openScorePop()
  assert.equal(page.giveScore.value, 4.5)
  assert.equal(page.hasScored.value, true)
  await page.addScore()
  assert.equal(page.requests.length, 1)
  assert.equal(page.store.scoredWallpaperList.length, 1)
})

test('an already rated wallpaper cannot submit another rating', async () => {
  const page = createPreview([{ id: 'wallpaper-a', score: 4.5 }])
  await page.addScore()
  assert.equal(page.requests.length, 0)
  assert.equal(page.store.scoredWallpaperList.length, 1)
})
