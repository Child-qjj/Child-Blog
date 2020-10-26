<template>
  <div id="app" style="height:100%">
    <el-scrollbar class="page-component__scroll" style="height:100%;">
      <keep-alive>
         <router-view/>        
      </keep-alive>
    </el-scrollbar>
    <el-backtop target=".page-component__scroll .el-scrollbar__wrap"></el-backtop>
  </div>
</template>
<script>
  import jwt_decode from 'jwt-decode'
  export default {
    name:'app',
    provide(){
      return{
      }
    },
    created(){
      if (localStorage.loginToken) {
        const decoded = jwt_decode(localStorage.loginToken);
        this.$store.dispatch("setIsAuthenticated",!this.isEmpty(decoded));
        this.$store.dispatch("setUser",decoded);
      }
    },
    data(){
      return{
      }
    },
    methods:{
       isEmpty(value){
            return 
                value === undefined ||
                value === null ||
                (typeof value === "object"&&Object.keys(value).length===0)||
                (typeof value === "string"&&value.trim().length===0)
        }
      // reload(){
      //   this.isRouterAlive=false;
      //   this.$nextTick(function(){
      //     this.isRouterAlive=true;
      //   })
      // }
    }
  }
</script>
<style>
html,body{
  height: 100%;
  overflow: hidden;
}
.page-component__scroll,.el-scrollbar__view{
  height: 100%;
}
.page-component__scroll .el-scrollbar__wrap{
  overflow-x:auto;
}
body{
      background-color: #f4f5f5;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

/* #nav {
  padding: 30px;
} */
*{
  padding: 0;
  margin: 0;
}
#nav a {
  font-weight: bold;
  color: #2c3e50;
  list-style: none;
  text-decoration: none;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
