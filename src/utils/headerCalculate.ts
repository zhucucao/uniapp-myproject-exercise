export function getStatusBarHeight(): number {
  const systemInfo = uni.getSystemInfoSync()
  return systemInfo.statusBarHeight ?? 0
}

export function getNavBarHeight(statusBarHeight: number): number {
  const defaultHeight = 44

  if (typeof uni.getMenuButtonBoundingClientRect !== 'function') {
    return defaultHeight
  }

  const menu = uni.getMenuButtonBoundingClientRect()

  if (!menu || !menu.height) {
    return defaultHeight
  }

  return menu.height + (menu.top - statusBarHeight) * 2
}


export function getHeaderHeights() {
  const statusBarHeight = getStatusBarHeight()
  const navBarHeight = getNavBarHeight(statusBarHeight)

  return {
    statusBarHeight,
    navBarHeight,
    totalHeight: statusBarHeight + navBarHeight,
  }
}