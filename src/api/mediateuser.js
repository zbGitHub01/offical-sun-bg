import request from "@/utils/request";

// 调解用户
// 员工列表
export function userlist(data) {
    return request({
        url: "/mediateCenter/mediate/users/list",
        method: "get",
        params: data
    });
}

// 详情
export function userinfo(data) {
    return request({
        url: "/mediateCenter/mediate/users/info",
        method: "get",
        params: data
    });
}

// 员工离职/恢复
export function userpositionStatus(data) {
    return request({
        url: "/mediateCenter/mediate/users/positionStatus",
        method: "post",
        data
    });
}

// 员工添加/更新
export function usersave(data) {
    return request({
        url: "/mediateCenter/mediate/users/save",
        method: "post",
        data
    });
}

// 员工账号-批量停用/启用
export function userstatus(data) {
    return request({
        url: "/mediateCenter/mediate/users/status",
        method: "post",
        data
    });
}

//员工-批量导入(检查)

export function importCheck(data) {
    return request({
        url: "/other/mediate/user/importCheck",
        method: "post",
        data
    });
}
//员工-批量导入

export function userimport(data) {
    return request({
        url: "/mediateCenter/mediate/users/import",
        method: "post",
        data
    });
}

//员工删除

export function userdelete(data) {
    return request({
        url: "/mediateCenter/mediate/users/delete",
        method: "post",
        data
    });
}