/**
 * 获取面包屑映射
 * before:
 * [{ path: '/', name: '首页' }, { path: '/user', name: '用户管理' }, { path: '/user/list', name: '用户列表' }],
 * to:
 * {
 *  '/': { path: '/', name: '首页' },
 *  '/user': { path: '/user', name: '用户管理' },
 *  '/user/list': { path: '/user/list', name: '用户列表' }
 * }
 * @param {Object} menuList 菜单配置
 * @param routes
 * @returns
 */
export const getBreadcrumbNameMap = (menuList: any, routes: any[]) => {
  const routerMap: any = {};
  const flattenMenuData = (data: any) => {
    data.forEach((menuItem: any) => {
      if (menuItem.children || menuItem.routes) {
        flattenMenuData(menuItem.children || menuItem.routes);
      }
      // Reduce memory usage
      routerMap[menuItem.path] = menuItem;
    });
  };
  flattenMenuData(routes);
  flattenMenuData(menuList);
  return routerMap;
};
