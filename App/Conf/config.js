module.exports = {
  //配置项: 配置值
  port: 8360, //监听的端口
  db_type: 'mysql', // 数据库类型
  db_host: '127.0.0.1', // 服务器地址
  db_port: '3306', // 端口
  db_name: 'tjblog', // 数据库名
  db_user: 'root', // 用户名
  db_pwd: 'root', // 密码
  db_prefix: 'db_', // 数据库表前缀

  //分组列表
  app_group_list: ['Home', 'Admin'],

  //网站配置
  web_conf:{
    title:'Vace nodejs Blog',
    keyword:'nodejs,blog',
    description:'this is description'
  }
};