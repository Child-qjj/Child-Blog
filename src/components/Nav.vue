<template>
    <div id="nav">
        <el-row :gutter="20">
          <el-col type="flex" :span="12">
            <div class="grid-content bg-purple title">
              <span class="link">Child</span>
              <span>热爱前端的学习者</span>
            </div>
          </el-col>
          <el-col type="flex" :span="12">
            <div class="grid-content bg-purple">
              <el-menu :default-active="this.$route.path" router class="el-menu-demo" mode="horizontal" @select="handleSelect">
                <el-menu-item index="/"><i class="el-icon-s-home"></i>博客首页</el-menu-item>
                <el-menu-item index="/about"><i class="el-icon-share"></i>经验分享</el-menu-item>
                <el-menu-item index="/resume"><i class="el-icon-tickets"></i>Resume</el-menu-item>
                <el-menu-item index="/admin"><i class="el-icon-user-solid"></i>管理</el-menu-item>
                <el-menu-item index="/logout" v-if="this.$store.getters.isAuthenticated">
                  <i class="el-icon-user-solid"></i>
                  <span>退出</span>
                </el-menu-item>
              </el-menu>
            </div>
          </el-col>
        </el-row>
 <!-- router -->  
    </div>
</template>
<script>
    export default {
        name:'navBar',
      data() {
        return {
        };
      },
      methods: {
        handleSelect(key, keyPath) {
          if (key=='/logout') {
            localStorage.removeItem('loginToken');
            this.$store.dispatch("clearCurrentState");
            this.$message({
              type:'success',
              message:'已退出登陆'
            })
          }
        },
      }
  }
</script>

<style scoped>
span.link{
  cursor: pointer;
}
#nav{
  position: sticky;
    top: 0px;
    z-index: 999;
}
.title{
    border-bottom: solid 1px #e6e6e6;
    padding-right: 25%;
    height: 60px;
}
.title span:first-child{
    font-size: 45px;
    padding-right:10px;
}
ul.el-menu-demo.el-menu--horizontal.el-menu {
    padding-right: 25%;
}
.el-col,.el-row{
      padding: 0 !important;
      margin: 0 !important;
      background-color: #FFF;
}
.el-menu--horizontal>.el-menu-item.is-active {
    border-bottom: 2px solid #409EFF;
    color:#42b983;
}
</style>