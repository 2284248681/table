exports.index=function(req,res){
    res.render('index',{});
}
exports.login=function(req,res){
    //1,解析客户端提交的数据
    var username  = req.body.username;
    var pwd  = req.body.pwd;
    //2,验证用户是否合法
    //(1)引入userService
    let UserService = require('../Service/UserService');
    //(2)创建对象
    let userService = new UserService();
    //(3)对象初始化
    userService.init();
    //(4)验证用户是否合法
    userService.checkUser(username,pwd,function(result){
        res.end(JSON.stringify(result));
    });

}