var mongoose=require('./index.js');
//用户，密码
var userSchema=mongoose.Schema({
    username:String,
    password:String
})
//写文章
var writeSchema=mongoose.Schema({
    title:String,
    content:String,
    username:String,
    id:Number
})
var User=mongoose.model('User',userSchema);
var Write=mongoose.model('Write',writeSchema);
module.exports={
    User,
    Write
}
