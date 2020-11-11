var express = require('express');

var router = express.Router();
var { User } = require('../model/model.js')
/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});
//创建注册接口
router.post('/register', function (req, res, next) {
  //用户注册数据获取
  let userDate = {
    username: req.body.username,//通过标签name属性
    password: req.body.password,//通过标签name属性
    password2: req.body.password2,//通过标签name属性
  }
  res.send(userDate)

  var userInfo = new User(userDate);
  userInfo.save(function (err, user) {
    if (err) return console.error(err)
    console.log('注册成功');
  })
})


//创建登录接口
router.post('/login', function (req, res, next) {
  //用户注册数据获取
  let user1 = {
    username: req.body.username,//通过标签name属性
    password: req.body.password,//通过标签name属性
  }
  // res.send(user1)
  //使用find查找到相同的数据的条数来控制成功与否
  User.find(user1, function (err, myUser) {
    if (err) return console.log(err)
    if (myUser.length > 0) {
      // console.log('登录成功');
      req.session.username = user1.username
      res.redirect('/')
    } else {
      // console.log("登录失败");
      res.redirect('/login')
    }
  })
})



module.exports = router;
