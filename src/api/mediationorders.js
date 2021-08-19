import request from "@/utils/request";

// 所有调解工单
// 调解工单列表
export function allOrderList(data) {
    return request({
        url: "/mediateCenter/mediate/list/mediateOrgAllList",
        method: "get",
        params: data
    });
}

//下载模板

export function download(data) {
    return request({
        url: "",
        method: "get",
        params: data
    });
}

//导入

export function importorder(data) {
    return request({
        url: "",
        method: "post",
        data
    });
}


//导出表头

export function exportTitle(data) {
    return request({
        url: "/mediateCenter/mediate/list/exportMediateListFields",
        method: "post",
        data
    });
}
//导出工单

export function exportOrder(data) {
    return request({
        url: "/mediateCenter/mediate/list/exportMediateList",
        method: "post",
        data
    });
}


//导出工单

export function queryMyOrgMdOrder(data) {
    return request({
        url: "/mediateCenter/mediate/list/queryMyOrgMdOrder",
        method: "post",
        data
    });
}