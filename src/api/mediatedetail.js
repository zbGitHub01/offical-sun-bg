import request from "@/utils/request";

// 调解详情
// 查询工单详情接口
export function mediateDetail(data) {
    return request({
        url: "/mediateCenter/mediate/detail/mediateDetail",
        method: "get",
        params: data
    });
}

// 查询调解记录
export function queryMediateRecord(data) {
    return request({
        url: "/mediateCenter/mediate/detail/queryMediateRecord",
        method: "get",
        params: data
    });
}

// 修改工单详情接口
export function updateMediateDeta(data) {
    return request({
        url: "/mediateCenter/mediate/detail/updateMediateDetail",
        method: "post",
        data
    });
}

// 修改调解方案
export function updateMediateScheme(data) {
    return request({
        url: "/mediateCenter/mediate/detail/updateMediateScheme",
        method: "post",
        data
    });
}

// 获取用户其它资料信息
export function getOtherData(data) {
    return request({
        url: "/mediateCenter/mediate/detail/getOtherData",
        method: "get",
        params: data
    });
}

//获取省

export function getProvinces(data) {
    return request({
        url: "/mediateCenter/mediate/config/getProvinces",
        method: "get",
        params: data
    });
}
//获取省

export function getCityList(data) {
    return request({
        url: "/mediateCenter/mediate/config/getCityList",
        method: "get",
        params: data
    });
}

//分期计算

export function queryPeriod(data) {
    return request({
      url: "/mediateCenter/mediate/detail/queryPeriod",
      method: "get",
      params:data
    });
  }

  //修改工单详情案人资料接口

export function updateMediateDetailCaseMsg(data) {
    return request({
        url: "/mediateCenter/mediate/detail/updateMediateDetailCaseMsg",
        method: "post",
        data
    });
}