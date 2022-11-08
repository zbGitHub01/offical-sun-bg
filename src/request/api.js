import Vue from 'vue'
import * as user from './modules/user'
import * as news from './modules/news'
import * as advantage from './modules/advantage'
import * as contact from './modules/contact'
import * as sunshine from './modules/sunshine'

export const api = {
    ...user,
    ...news,
    ...advantage,
    ...contact,
    ...sunshine,
}

Vue.prototype.$api = api