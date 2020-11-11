var express = require('express');
const session = require('express-session')
var router = express.Router();
var { Write } = require('../model/model.js')
var fs = require('fs')
var multipart = require('multiparty')
 
// router.post('/write', function(req,res,next) {
//   let minDate={
//     title: req.body.title,//通过标签name属性
//     content: req.body.content,//通过标签name属性
//     id:Date.now()
//   }
//   // res.send(minDate)
//   var minInfo=new Write(minDate)
//   minInfo.save(function(err){
//     if(err) return console.log(err)
//   })
//   res.redirect('/')
// })
//创建写文章接口
router.get('/write',async function(req,res,next){
  var id=parseInt(req.body.id)
  if(id){ //编辑
  var page=req.body.page
  var title=req.body.title
  var content=req.body.content
  const article=await Write.findOne({id})
  article.set({title:title,content:content})
  article.save()
  res.redirect('/?page='+page) 
  }else{//新增
var data={
  title:req.body.title,
  content:req.body.content,
  username:req.session.username
}
let main=new Write(data)
main.save()
res.redirect('/')
  }
})
//上传文件接口
router.post('/upload', function (req, res, next) {
  var form = new multipart.Form();
  form.parse(req, function (err, fields, files) {
    if (err) { console.log('上传失败'); }
    else {
      // console.log(files.upload[0]);
      let file = files.upload[0];
      //读取文件
      let rs=fs.createReadStream(file.path)//读取文件所在本地的位置--来自客户端的文件位置
      //新建要存储的路径--在服务器端创建一个可以存储文件的目录
      let newRs ='/upload/'+file.originalFilename
      //将新目录文件写入public里面
      let ws=fs.createWriteStream('./public'+newRs)
      rs.pipe(ws)//边读边写
      //当文件读取关闭，监听close事件
      ws.on('close',function(){
        //是ck要求返回的参数
        res.send({uploaded:1,url:newRs})//这个结果将从文本域进入数据库
      })
    }
  })
})


//删除文章
router.get('/delete',function(req,res, next){
  var id=parseInt(req.query.id)
  var page=req.query.page
  Write.deleteMany({id},function(err){ console.log(err)});
  res.redirect('/?page='+page)
  // console.log(id);
  // console.log(page);
})
module.exports = router;