/**
 * controller
 * @return 
 */
module.exports = Controller("Admin/BaseController", function(){
  "use strict";
  return {
    indexAction: function(){
      var self = this;
      //从数据库中读取现有的文章
      return D('Blog').field('id,category,title,views,create_time').select().then(function(data){
        self.assign('blogList',data);
        return self.display();
      }).catch(function(err){
        return self.error('数据库错误');
      })
    }
  };
});