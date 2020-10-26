<template>
  <div id="admin" style="height:100%;">
    <el-row class="tac" style="height:100%">
      <el-col :span="4" style="height:100%">
        <Aside></Aside>
      </el-col>
      <el-col :span="20">
        <keep-alive>
          <router-view/>
        </keep-alive>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import RoleTable from '../components/adminComponent/RoleTable'
  import ArticleTable from '../components/adminComponent/ArticleTable'
  import BackTo from '../components/backPage.vue'
  import MarkDown from "../components/adminComponent/MarkdownEdit"
  import Aside from "../components/adminComponent/Aside" 
  export default {
    name:'admin',
    data(){
      return{
      }
    },
    components:{
      RoleTable,
      BackTo,
      ArticleTable,
      MarkDown,
      Aside
    },
    methods:{
      handleRouter(index,indexPath){
      //  console.log(index,indexPath);
      },
      handleOpen(key, keyPath) {
      //  console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
      //  console.log(key, keyPath);
      },
    }
  }
</script>
<style scoped>
.tac{
  top: 1px;
}
</style>