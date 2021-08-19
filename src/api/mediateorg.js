import request from '@/utils/request'

// 机构查询可用调解中心列表接口
export function usableList(data) {
    return request({
        url: "/mediateCenter/mediate/usableList",
        method: "get",
        params: data
    });
}