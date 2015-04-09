module.exports = Controller(function(){
  return {
    init: function (http) {
      this.super('init', http);
    },
    loginAction: function () {
      var self = this;
      if (this.isPost()) {
        var username = this.post('user');
        var psd = this.post('pwd');

        return D('User').where({
          username:username,
          password:md5(psd)
        }).find().then(function(data){
          if(isEmpty(data)){
            self.error('用户名或者密码不正确');
          }else{
            self.session('user',data)
            self.success('登陆成功');
          }
        })
      } else {
        return this.display();
      }
    },
    lgoutAction:function(){
      var that = this;
      that.session('user',null).then(function(){
        that.redirect('/Admin/Login/login')
      });
    }
  };
});
