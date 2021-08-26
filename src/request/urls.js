export const urls = {
    // 登录
    adminLogin: '/user/adminLogin', // 登录
    getUser: '/user/getUser', // 获取用户信息
    changePassword: '/user/changePassword', // 用户修改密码

    // 广告
    addAdvantageCategory: '/AdvantageCategory/add', // 添加广告分类
    deleteAdvantageCategory: '/AdvantageCategory/delete', // 删除广告分类
    updateByIdAdvantageCategory: '/AdvantageCategory/updateById', // 广告id修改广告分类
    findPageAdvantageCategory: '/AdvantageCategory/findPage', // 广告分类分页
    findByAllAdvantageCategory: '/AdvantageCategory/findByAll', // 全部广告分类
    findPageAdvantage: '/advantage/findPage', // 后台分页
    addAdvantage: '/advantage/add', // 添加广告
    updateByIdAdvantage: '/advantage/updateById', // 修改广告
    deleteAdvantage: '/advantage/delete', // 删除广告
    deleteListAdvantage: '/advantage/deleteList', // 删除多条广告
    findByIdAdvantage: '/advantage/findById', // 根据广告id查广告

    // 新闻
    findPageArticle: '/article/findPage', // 新闻资讯分页
    addArticle: '/article/add', // 添加新闻资讯
    deleteArticle: '/article/delete', // 删除新闻资讯
    deleteListArticle: '/article/deleteList', // 删除多条广告
    updateByIdArticle: '/article/updateById', // 修改新闻资讯
    findByIdArticle: '/article/findById', // 新闻资讯id查新闻资讯
    updateSortArticle: '/article/updateSort', // 修改新闻资讯位置

    // 管理员
    findPageUser: '/user/findPage', // 分页获取用户
    addUser: '/user/add', // 添加用户
    updateByIdUser: '/user/updateById', // 修改用户
    deleteUser: '/user/delete', // 删除用户
    getUsers: '/user/getUsers', // 根据id获取用户信息



}