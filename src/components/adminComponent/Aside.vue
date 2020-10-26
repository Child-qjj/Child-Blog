<template>
      <div id="aside" style="height:100%">
        <el-menu
          default-active="/admin"
          class="el-menu-vertical-demo"
          router
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b">
          <!-- @close="handleClose"
          @open="handleOpen"
          @select="handleRouter" -->
          <el-menu-item index="/admin">
            <i class="el-icon-s-custom"></i>
              <span>用户管理</span>
          </el-menu-item>
          <el-menu-item index="/admin/page-list">
            <i class="el-icon-document"></i>
              <span>文章管理</span>
          </el-menu-item>
          <el-menu-item index="/admin/edit/8781548781">
            <i class="el-icon-edit"></i>
            <span>新建文章</span> 
          </el-menu-item>
          <div class="out" @click="back">
            <i class="el-icon-back"></i>
            <span>退出</span>
          </div>
        </el-menu>
      </div>
</template>

<script>
export default {
    name:'left_nav',
    methods:{
      back(){
        this.$router.push('/');
      }
    }
}
</script>

<style scoped>
  ul.el-menu-vertical-demo.el-menu {
    height: 100%;
}
.out {
    /* top: 53px; */
    position: absolute;
    bottom: 20px;
    cursor:pointer;
    left: 85px;
    color: aliceblue;
}
</style>