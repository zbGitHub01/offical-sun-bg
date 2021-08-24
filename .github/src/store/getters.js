const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  orgId: state => state.user.orgId,
  departmentId: state => state.user.departmentId,
  userId: state => state.user.userId,
  isExportCase: state => state.user.isExportCase,
  bindThirdStatus: state => state.user.bindThirdStatus,
  totalReductionAmount: state => state.user.totalReductionAmount,
  departmentName: state => state.user.departmentName,
  openId: state => state.user.openId,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  proData: state => state.websocket.proData,
  permission_routes: state => state.permission.routes,
};
export default getters;