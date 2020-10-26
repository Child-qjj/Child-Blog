<template> 
  <div id="home">
    <NavBar></NavBar>
    <div id="main">
      <el-row :gutter="20">
        <el-col :span="17"><router-view :blogs="blogs"></router-view></el-col>      <!-- <showArticle :blogs="blogs"></showArticle> -->
        <el-col :span="7">
          <el-row :gutter="20" id="stiky"><showInfo :contact="contact"></showInfo></el-row>
        </el-col>
      </el-row>
  </div>
  </div>
</template>

<script>
// @ is an alias to /src
import NavBar from '@/components/Nav'
import showInfo from '@/components/MainComponents/showInfo'
import showArticle from '@/components/MainComponents/showArticles'
import {base64ToBlob} from '@/utils/base64ByBlob'

export default {
  name: 'Home',
  data(){
    return{
      contact:{
        QQ:'QQ:429814031'
      },
      blogs:[
        {
         title:'what',
         date:'2017-8-9',
         main:'组件传值:时可能因为axios异步请求数据延迟返回导致在子组件的props对象赋值未定义,可以使用watch监听该对象,并进行定义'
        }
      ]
    }
  },
  components: {
    NavBar,
    showInfo,
    // showArticle,
  },
    // beforeRouteUpdate(to,from,next){
    //     console.log(to);
    //     console.log(from);
    //     next();
    // },
  // computed:{
  //   path:function(){
  //     if (this.$route.fullPath!='/') {
  //       this.num = 24;
  //     }
  //     else this.num = 17;
  //       return this.$route.fullPath;
  //   }
  
  // },
  created(){
    this.getUserInfo();
  },
  methods:{
    async getUserInfo(){
        const res= await this.$axios.get("/user/essay/html");
          this.blogs=res.data.data;
          // res.data.data.forEach(item => {
          //   if (item.cover_img) {
          //     let base64 = item.cover_img.split(',')[1]
          //       base64ToBlob({b64data: base64, contentType: 'image/png'})
          //             .then(res => {
          //         // 转后后的blob对象
          //         item.cover_img=res.preview;
          //       })
          //   }
          // });
          const result = await this.$axios.get("/user/users/14");
          this.contact=result.data.data[0];
          // console.log(this.contact);
          // console.log(this.$route.fullPath);
        },
  }
}
</script>
<style scoped>
   #main{
    margin-top: .5rem !important;
    max-width: 1100px;
    margin: 0 auto;
  }
</style>
