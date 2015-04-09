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
      return D('Blog').alias('b').field('b.id,title,cate,views,create_time').join({
        table: 'category',
        join: 'inner', //join方式，有 left, right, inner 3种方式
        on: ['cid', 'id'] //ON条件
      }).page(this.get('page')).countSelect().then(function(data){
        self.assign('pagerData', data); //这里assign的变量必须为pagerData，分页展示使用
        self.assign('blogList', data.data);
        return self.display();
      }).catch(function(err){
        return self.error('数据库错误');
      })
    },
    //图片上传
    utilUploadImg: function(upImgName, upImgPath) {
      var extension = '';
      var finalFileName = '';
      var fs = require('fs');
      //处理后缀和文件名
      upImgPath.indexOf('png') !== -1 ? extension = '.png' : extension = '.jpg';
      finalFileName = new Date().getTime() + extension;

      //读取文件
      fs.readFile(upImgPath, function(err, data) {
        if (err) {
          console.log('There was an error when reading file');
        } else {
          //写入文件到uplaod
          fs.writeFile('upload/' + finalFileName, data, function(err) {
            if (err) {
              console.log('There was an error when write file');
            } else {
              console.log('saved');
            }
          });
        }
      });
      return finalFileName;
    },
    addAction:function(){
      var self = this;
      if(self.isPost()){
        var blogModel = D('Blog');
        var pData = self.post();
        var vBImg = self.file('cover');
        if(vBImg.size){
          var finalFileName = this.utilUploadImg(pData.name, vBImg.path);
          //保存数据到数据库
          pData.cover = finalFileName;
          pData.create_time = Date.parse(new Date) / 1000;
          blogModel.add(pData).then(function(insert) {
            if(insert){
              return self.redirect('/Admin/index/index');
            }else{
              return self.redirect('/Admin/index/add');
            }
          });
        }else{
          return self.redirect('/Admin/index/add');
        }
      }else{
        return D('Category').field('id,cate').select().then(function(data){
          self.assign('cateList',data);
          return self.display();
        }).catch(function(err){
          return self.error('数据库错误');
        })
      }
    },
    editAction:function(){
      var self = this,id = this.get('id');
      return D('Blog').where({id: id}).find().then(function(data){
        return D('Category').field('id,cate').select().then(function (arr) {
          self.assign('info', data);
          self.assign('cateList', arr);
          return self.display();
        }).catch(function (err) {
          return self.error('数据库错误');
        });
      }).catch(function (err) {
        return self.error('数据库错误');
      })
    },
    //用于404的访问
    _404Action:function(){
      this.status(404);
      this.end('页面不存在');
    },
    //empty操作
    __call:function(action){
      this.end(action+'不存在');
    },
  };
});