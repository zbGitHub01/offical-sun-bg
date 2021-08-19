import { asyncRoutes, constantRoutes } from '@/router'
import { getUserPermission} from "@/api/user";
import { uninfor} from "@/utils/formatedate"
/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, roles) {
  const res = []

  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })

  return res
}

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}

const actions = {
  generateRoutes({ commit }, roles) {
    return new Promise(resolve => {
      let params = {
        sysProductUuid: '0c933f65cf33310bb896e782c0861468454f8b17' ,
      } 
      getUserPermission(params).then(response => { 
        const { data } = response;
        let accessedRoutes
        let firstRouter = []
        let secondRouter = []
        let thirdRouter = []
        let first = []
        let second = []
        let third = []
        accessedRoutes =  asyncRoutes
          //通过后端所传权限树，匹配当前权限树，将相同的权限放入路由中
          if (data.authCenterRolePermissionList.length === 0) {
            accessedRoutes = asyncRoutes
          } else {
            data.authCenterRolePermissionList.map(item => {
              // console.log(item.permissionType,"000")
              item.permissionType.type === 1 ? firstRouter.push(item.menuCode) : null
              if (item.children !== []) {
                item.children.map(items => {
                  items.permissionType.type === 1 ? secondRouter.push(items.menuCode) : null
                  if (items.children !== []) {
                    items.children.map(value => {
                      value.permissionType.type === 1 ? thirdRouter.push(value.menuCode) : null
                    })
                  }
                })
              }
            })
            asyncRoutes.map(item => {
              if (item.access != undefined) {
                first.push(item.access)
                if (item.children !== []) {
                  item.children.map(items => {
                    if (items.access != undefined) {
                      second.push(items.access)
                      if (items.children !== [] && items.children !== undefined) {
                        items.children.map(value => {
                          third.push(value.access)
                        })
                      }
                    }
                  })
                }
              }
            });
            let unfirst = uninfor(first, firstRouter)
            let unsecond = uninfor(second, secondRouter)
            let unthird = uninfor(third, thirdRouter)
            if (unfirst.length !== 0) {
              for (let j = 0; j < unfirst.length; j++) {
                accessedRoutes.map((item, index) => {
                  if (item.access !== undefined) {
                    if (item.access === unfirst[j]) {
                      accessedRoutes.splice(index, 1)
                    } else {
                      if (item.access !== undefined) {
                        if (item.children !== []) {
                          if (unsecond.length !== 0) {
                            for (let i = 0; i < unsecond.length; i++) {
                              item.children.map((items, indexs) => {
                                if (items.access !== undefined && items.access === unsecond[i]) {
                                  item.children.splice(indexs, 1)
                                } else {
                                  if (items.children !== [] && items.children !== undefined) {
                                    for (let w = 0; w < unthird.length; w++) {
                                      items.children.map((val, indext) => {
                                        if (val.access === unthird[w]) {
                                          items.children.splice(indext, 1)
                                        }
                                      })
                                    }
                                  }
                                }
                              })
                            }
                          } else {
                            item.children.map((items) => {
                              if (items.children !== [] && items.children !== undefined) {
                                for (let w = 0; w < unthird.length; w++) {
                                  items.children.map((val, indext) => {
                                    if (val.access === unthird[w]) {
                                      items.children.splice(indext, 1)
                                    }
                                  })
                                }
                              }
                            })
                          }
                        }
                      }
                    }
                  }
  
                })
              }
            } else {
              accessedRoutes.map((item) => {
                if (item.access !== undefined) {
                  if (item.children !== []) {
                    if (unsecond.length !== 0) {
                      for (let i = 0; i < unsecond.length; i++) {
                        item.children.map((items, indexs) => {
                          if (items.access !== undefined && items.access === unsecond[i]) {
                            item.children.splice(indexs, 1)
                          } else {
                            if (items.children !== [] && items.children !== undefined) {
                              for (let w = 0; w < unthird.length; w++) {
                                items.children.map((val, indext) => {
                                  if (val.access === unthird[w]) {
                                    items.children.splice(indext, 1)
                                  }
                                })
                              }
                            }
                          }
                        })
                      }
                    } else {
                      item.children.map((items) => {
                        if (items.children !== [] && items.children !== undefined) {
                          for (let w = 0; w < unthird.length; w++) {
                            items.children.map((val, indext) => {
                              if (val.access === unthird[w]) {
                                items.children.splice(indext, 1)
                              }
                            })
                          }
                        }
                      })
                    }
                  }
                }
              })
            }
  
          }
        console.log(accessedRoutes,"54769457")
        commit('SET_ROUTES', accessedRoutes)
        resolve(accessedRoutes)
        // resolve(data);
      })
      .catch(error => {
        reject(error);
      });
    
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
