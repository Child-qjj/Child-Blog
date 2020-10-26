<template>
    <div id="resume">
        <BackTo></BackTo>
        <div id="page">
            <header id="title" class="header">
                <h1>邱君杰</h1>
                <div class="contact text">
                    <span>
                        联系方式:
                        <ul>
                            <li>手机:15542496176</li>
                            <li>微信:15059995027</li>
                            <li>常用邮箱:429814031@qq.com</li>
                        </ul>
                    </span>
                </div>
            </header>
        <hr>
        <main>
            <div class="list">
                <el-row :gutter="30">
                    <el-col>
                        <h3 class="header">求职意向</h3>
                        <span class="text">Web前端(广州)</span>
                    </el-col>
                </el-row>
            </div>
            <div class="list">
                <el-row :gutter="30">
                    <el-col>
                        <h3 class="header">教育背景</h3>
                        <span class="text">2017.9-2021.6    大连交通大学    软件工程 (全日制本科)</span>
                    </el-col>
                </el-row>
            </div>
            <div class="list">
                <el-row :gutter="30">
                    <el-col>
                        <h3 class="header">项目经历</h3>
                        <div>
                            <h4 class="text">个人博客(本博客)</h4>
                            <div class="mes">
                                <p>1.使用Vue+Element-UI+Vue-router+Vuex+Koa构建整个项目</p>
                                <p>2.整个项目通过单页面路由跳转实现功能，由大小组建嵌套实现各模块的功能,简单实现前后端分离</p>
                                <p>3.使用element-ui完成页面布局并实现页面交互效果</p>
                                <p>4.使用vue-axios处理请求,二次封装 axios,方便项目请求与数据操作</p>
                                <p>5.封装了公用工具库,对日期格式化、图片转换,代码高亮等功能进行封装</p>
                                <p>6.对登陆认证几种方式有了一定的了解</p>
                            </div>
                        </div>
                         <div>
                            <h4 class="text"></h4>
                            <p></p>
                        </div>
                    </el-col>
                </el-row>
            </div>
        </main>
        </div>
    </div>
</template>

<script>
import BackTo from '../components/backPage.vue'
export default {
    name:'resume',
    components:{
        BackTo
    }
}
</script>

<style scoped>
.mes p{
    margin-left:65px;
}
#resume{
    width: 794px;
    height: 1090px;
    background-color: #FFF;
    margin:10px auto;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
}
div#page {
    padding: 50px 72px;
    text-align: left;
}
#page h1,#page ul,h3{
    padding: 0;
    margin: 0;
    list-style: none;
}
.contact ul{
    display: inline-flex;
}
.contact li{
    margin-left:10px ;
}
.text {
    margin-left: 32px;
}
.header{
    color:#2A7B88;
}
</style>