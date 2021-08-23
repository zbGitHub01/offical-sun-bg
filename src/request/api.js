import Vue from 'vue'
import * as user from './modules/user'
import * as news from './modules/news'
import * as advantage from './modules/advantage'

export const api = {
    ...user,
    ...news,
    ...advantage,
}

Vue.prototype.$api = api