import request from "@/utils/request";

// 调解配置管理
// 查询债权方列表
export function queryCreditorList(data) {
    return request({
        url: "/mediateCenter/mediate/config/queryCreditorList",
        method: "get",
        params: data
    });
}

// 查询法人配置
export function queryLegal(data) {
    return request({
        url: "/mediateCenter/mediate/config/queryLegal",
        method: "get",
        params: data
    });
}

//修改法人配置

export function mediateconfigedit(data) {
    return request({
        url: "/mediateCenter/mediate/config/edit",
        method: "post",
        data
    });
}

//查询代理人列表

export function configqueryAgent(data) {
    return request({
        url: "/mediateCenter/mediate/config/queryAgent",
        method: "get",
        params: data
    });
}


//修改代理人资料

export function mediateconfigupdateAgent(data) {
    return request({
        url: "/mediateCenter/mediate/config/updateAgent",
        method: "post",
        data
    });
}

//添加代理人资料

export function mediateconfigaddAgent(data) {
    return request({
        url: "/mediateCenter/mediate/config/addAgent",
        method: "post",
        data
    });
}

//删除代理人资料

export function mediateconfigdeleteAgent(data) {
    return request({
        url: "/mediateCenter/mediate/config/deleteAgent",
        method: "delete",
        params: data
    });
}

//查询纠纷描述模板列表

export function mediatequeryconfigqueryMdDispute(data) {
    return request({
        url: "/mediateCenter/mediate/config/queryMdDispute",
        method: "get",
        params: data
    });
}

//查询调解方案模板列表

export function mediatequeryconfigqueryMdScheme(data) {
    return request({
        url: "/mediateCenter/mediate/config/queryMdScheme",
        method: "get",
        params: data
    });
}

//添加纠纷方案模板列表

export function mediateconfigaddMdDispute(data) {
    return request({
        url: "/mediateCenter/mediate/config/addMdDispute",
        method: "post",
        data
    });
}

//添加调解方案模板

export function mediateconfigaddMdScheme(data) {
    return request({
        url: "/mediateCenter/mediate/config/addMdScheme",
        method: "post",
        data
    });
}

//删除纠纷描述模板

export function mediateconfigdeleteMdDispute(data) {
    return request({
        url: "/mediateCenter/mediate/config/deleteMdDispute",
        method: "delete",
        params: data
    });
}

//删除调解方案模板

export function mediateconfigdeleteMdScheme(data) {
    return request({
        url: "/mediateCenter/mediate/config/deleteMdScheme",
        method: "delete",
        params: data
    });
}

//修改纠纷描述模板

export function mediateconfigupdateMdDispute(data) {
    return request({
        url: "/mediateCenter/mediate/config/updateMdDispute",
        method: "post",
         data
    });
}

//修改调解方案模板

export function mediateconfigupdateMdScheme(data) {
    return request({
        url: "/mediateCenter/mediate/config/updateMdScheme",
        method: "post",
        data
    });
}

//删除代理人其它资料

export function deleteAgentFile(data) {
    return request({
        url: "/mediateCenter/mediate/config/deleteAgentFile",
        method: "delete",
        params: data
    });
}

//删除法人其它资料信息

export function deleteLegalFile(data) {
    return request({
        url: "/mediateCenter/mediate/config/deleteLegalFile",
        method: "delete",
        params: data
    });
}