function UserService(){

    //对象初始化
    this.init=function(){
        //(1)引入UserDao模块
        var UserDao =  require('../Dao/UserDao');
        //(2)获得对象
        this.userDao = new UserDao();
        //(3)对象初始化
        this.userDao.init();
    }

    this.checkUser=function(username,pwd,call){

        //(1)用户工具类
        // let tool=require('../Tools/tool');
        // var username =tool.crypto(username);
        // var pwd =tool.crypto(pwd);

        this.selectUserByName(username,function(result){
            var body={
                state:0,
                msg:''
            }


            //1,获得数组的长度
            var length = result.length;

            if(length==0){
                body.state=-1;
                body.msg="没有当前用户账号，请确认账号是否正确，如果没有账号，请注册新用户！"
            }else{
                //2,把密码从数组对象里面取出来
                var buffer = result[0].pwd;
                //3,判断用户是否合法
                if(pwd==buffer){
                    body.state=1,
                        body.msg="登录成功！";
                }else{
                    body.state=2,
                        body.msg="登录失败，密码错误，请重新输入密码！";
                }
            }
            call(body);
            // var data = JSON.stringify(response);
            // res.end(data);
        });
   

    };
    this.selectUserByName=function(pwd,call){
        //(4)查询密码
        this.userDao.selectUserByName(pwd,function(result){
            call(result);
        });
    }

}
module.exports=UserService;