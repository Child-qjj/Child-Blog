# Vue 实战之个人博客项目

> 有什么更好的建议,请在博客留言,欢迎评价

### 1.1.项目简介

使用Vue编写的个人博客项目,使用了node+koa编写的接口,基本实现了一个简单的个人博客,具备了文章发布,浏览,以及评论留言,音乐欣赏的功能,不过由于经验问题,模块的划分不够明确,后期会继续改进,项目已经完成了如下功能:可以浏览 [我的博客](http://www.childqjj.com/)

博文列表页面:

- 详情查看
- 创建日期
- 文章标题
- 个人信息

![1604043074(1)](C:\Users\Child.LAPTOP-14HHM9DO\Desktop\1604043074(1).png)

经验分享页面:

- Aplayer音乐播放器(这里用到了Vue-player插件,虽然在后面的项目中已经可以自己实现相同的功能,但是目前不会进行重构)
- 评论留言

![1604043425(1)](C:\Users\Child.LAPTOP-14HHM9DO\Desktop\1604043425(1).png)![image-20201030153812061](C:\Users\Child.LAPTOP-14HHM9DO\AppData\Roaming\Typora\typora-user-images\image-20201030153812061.png)

登录页面:

![1604043570(1)](C:\Users\Child.LAPTOP-14HHM9DO\Desktop\1604043570(1).png)

文章管理页面:

- 用户管理
- 文章管理
- 新建文章

![1604043651(1)](C:\Users\Child.LAPTOP-14HHM9DO\Desktop\1604043651(1).png)

### 新建文章页面

基于mavon-editor插件,实现了markdown图片上传并转换成url地址的功能

![1604043888(1)](C:\Users\Child.LAPTOP-14HHM9DO\Desktop\1604043888(1).png)



