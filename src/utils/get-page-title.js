import defaultSettings from '@/settings'

const title = defaultSettings.title || 'Vue Admin Template'

export default function getPageTitle(pageTitle) {
    const temTitle = pageTitle === '首页' ? '数字科技助力青年成长' : pageTitle
    if (pageTitle) {
        return `${title} - ${temTitle}`
    }
    return `${title}`
}