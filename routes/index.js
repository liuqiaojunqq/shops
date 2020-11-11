var express = require('express');
var router = express.Router();
var { Write } = require("../model/model")
var moment = require('moment')
/* GET home page. */
router.get('/', async function (req, res, next) {
  let page = req.query.page || 1
  //获取到文章列表
  // Write.find(function(err,datalist) {
  //   console.log(datalist);
  // })
  let data = {
    totle: '',//总页数
    currentPage: page,//当前页码
    list: [],//当前页码渲染的数据列表
  };
 
  let pageSize = 3//每一页显示几条
  //limit：最大限制   sort：排序
  let dataList = await Write.find()
    .limit(pageSize)
    .sort({ _id: -1 })
    .skip(pageSize * (data.currentPage - 1));
  // console.log(dataList);
  //总页码数
  data.totle = Math.ceil(await Write.find().count() / pageSize)//数据总数除以每页条数
  dataList.map(item => {
    item['time'] = moment(item.id).format('LLL')
  })
  //当前页码
  //页面数据
  data.list = dataList
  //渲染首页首先从session拿到用户名
  let username = req.session.username || ''
  res.render('index', { username, data: data });
});
//渲染写文章
router.get('/write',async (req,res,next)=>{
  var username=req.session.username||'';
  //1.获取到传输过来的id
  var id=parseInt(req.query.id)
  var page=req.query.page
  var item={
    title:'',
    content:''
  }
  if(id){//编辑
    //查找数据
    item=await Write.findOne({ id:id})
    item.page=page
    // console.log(item);
    //渲染页面
    res.render('write',{username,item})
  }else{//新增
    res.render('write',{username,item})
  }
})
//注册页面
router.get('/register', function (req, res, next) {
  res.render('register', {});
});
//登录页面
router.get('/login', function (req, res, next) {
  res.render('login', {});
});
//写文章页面
router.get('/write', function (req, res, next) {
  res.render('write', {});
});
//详情页面
router.get('/details',async function (req, res, next) {
  var id=parseInt(req.query.id)
  let data=await Write.findOne({id})
  let username = req.session.username || ''
  res.render('details', {username,data});
});
module.exports = router;
