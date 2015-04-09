/**
 * 项目里的Controller基类
 * 这里做一些通用的处理逻辑，其他Controller继承该类
 * @param  {[type]} 
 * @return {[type]}         [description]
 */
module.exports = Controller(function(){
  'use strict';
  return {
    init: function(http){
      this.super("init", http);
      //其他的通用逻辑
      var self = this;
      return this.session('user').then(function(data){
        if(isEmpty(data)){
          if(self.isAjax()){
            return self.error(401,'请先登陆');
          }else{
            return self.redirect('/Admin/Login/login');
          }
        }else{
          self.assign('user',data);
        }
      })
    }
  }
})