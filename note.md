# 登录
    1. 实现用户登录
    2. 


    1. 创建写文章路由并导出，完成article.js页面
    2. 在app.js里面导入article，
    3. app.use方法使用

    上传文件
    1. 配置接口 ckfinder：{}
    2. 创建接口 router.post()
    3. 展示在富文本框中
        所用技术：fs，multiparty
        实现步骤：
            1.导入需要的包（导入fs，multiparty）
            2.引入（fs，multiparty）
            3.使用包的form.parse()方法
            form.parse(req,function(err,fields,files){}
            fs操作文件及系统