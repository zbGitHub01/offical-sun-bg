import request from "@/utils/request";
import { getOrgId} from "@/utils/auth"
//下拉列表
export function selectList(data) {
  let paramst = Object.assign({},data)
  paramst['orgId'] = getOrgId()
  return request({
    url: "/other/dict/dropdown/list",
    method: "get",
    params: paramst
  });
}
export function cpeList(data) {
  let paramst = Object.assign({},data)
  paramst['orgId'] = getOrgId()
  return request({
    url: "/other/user/dutyStaff",
    method: "get",
    params: paramst
  });
}
export function onJob(data) {
  let paramst = Object.assign({},data)
  paramst['orgId'] = getOrgId()
  return request({
    url: "/other/user/onJob",
    method: "get",
    params: paramst
  });
}

//下拉选项管理列表

export function selectmanageList(data) {
  return request({
    url: "/other/dict/dropdown/manage/list",
    method: "get",
    params: data
  });
}

//更新/添加

export function updateselect(data) {
  return request({
    url: "/other/dict/dropdown/manage/save",
    method: "post",
    data
  });
}

//编辑子选项

export function childrenselect(data) {
  return request({
    url: "/other/dict/dropdown/childOption/add",
    method: "post",
    data
  });
}

//获取文本框值
export function gettextnum(data) {
  return request({
    url: "/other/dict/single/info",
    method: "get",
    params: data
  });
}
//到处文本
export function exportField(data) {
  return request({
    url: "/org/safe/case/exportField",
    method: "get",
    params: data
  });
}
//修改文本框值
export function edittextnum(data) {
  return request({
    url: "/other/dict/single/update",
    method: "post",
    data
  });
}

//省市区
export function getareaTree() {
  return request({
    url: "/other/dict/area/tree",
    method: "get",
  });
}

//临时标签list

export function getLabelList() {
  return request({
    url: "/caseCenter/case/tagTemp/list",
    method: "get",
  });
}

//导出

export function caseexport(data) {
  return request({
    url: "/caseCenter/org/companyCase/export",
    method: "post",
    data
  });
}

//导出处置记录
export function followexport(data) {
  return request({
    url: "/caseCenter/org/follow/export",
    method: "post",
    data
  });
}

//委案批次

export function entrustBatchSelector(data) {
  let paramst = Object.assign({},data)
  paramst['orgId'] = getOrgId()
  return request({
    url: "/caseCenter/case/entrust/entrustBatchSelector",
    method: "get",
    params: paramst
  });
}

