import Vue from 'vue'
import * as user from './modules/user'
import * as news from './modules/news'
import * as advantage from './modules/advantage'
import * as contact from './modules/contact'

export const api = {
    ...user,
    ...news,
    ...advantage,
    ...contact,
}

Vue.prototype.$api = api