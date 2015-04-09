//这里定义一些全局通用的函数，该文件会被自动加载
global.formatDate = function(formatStr, fdate){
  var fTime, fStr = 'ymdhis';
  if (!formatStr)
    formatStr= "y-m-d";
  if (fdate)
    fTime = new Date(fdate*1000);
  else
    fTime = new Date();
  var formatArr = [
    fTime.getFullYear().toString(),
    (fTime.getMonth()+1).toString(),
    fTime.getDate().toString(),
    fTime.getHours().toString(),
    fTime.getMinutes().toString(),
    fTime.getSeconds().toString()
  ]
  for (var i=0; i<formatArr.length; i++)
  {
    formatStr = formatStr.replace(fStr.charAt(i), formatArr[i]);
  }
  return formatStr;
}