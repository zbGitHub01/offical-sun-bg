import Vue from 'vue'

// 判断为空
export function isEmpty(value) {
    var type
    if (value == null || value == 'null' || value === undefined || value === 'undefined') { // 等同于 value === undefined || value === null
        return true
    }
    type = Object.prototype.toString.call(value).slice(8, -1)
    switch (type) {
        case 'String':
            return value.trim() === ''
        case 'Array':
            return value.length === 0
        case 'Object':
            return JSON.stringify(value) === '{}' // 普通对象使用 for...in 判断，有 key 即为 false
        default:
            return false // 其他对象均视作非空
    }
};
// 删除对象中空的属性
export function deleteObjectEmptyAttr(obj) {
    Object.keys(obj).forEach((key) => {
        if (isEmpty(obj[key])) {
            delete obj[key]
        }
    })
    return obj
}
Vue.prototype.$deleteObjectEmptyAttr = deleteObjectEmptyAttr
Vue.prototype.$isEmpty = isEmpty