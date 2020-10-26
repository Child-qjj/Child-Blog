<template>
  <div class="about">
    <NavBar></NavBar>
    <el-row class="center">
      <el-col :span="24">
        <el-row :gutter="20">
          <Head></Head>
          </el-row>
          <el-row :gutter="20">
            <div id="music">
              <Aplayer :music.sync="player.music" :list.sync="list"/>
            </div>
          </el-row>
          <el-row :gutter="20">
            <div id="message">
              <formTable></formTable>
              <Reply :itemlist="itemlist" :num="num" :authorization="authorization" :mark="mark">
              </Reply>
            </div>
          </el-row>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import formTable from "../components/leaveMessages/form"
import Reply from '../components/leaveMessages/reply'
import Head from '../components/leaveMessages/header'
import NavBar from '../components/Nav'
import Aplayer from 'vue-aplayer'
export default{
    name:'share',
    components:{
      formTable,
      Reply,
      Head,
      NavBar,
      Aplayer
    },
    // props:['item'],
    created(){
      this.getSum();
      this.getMusic();
    },
    data(){
      return{
        authorization:this.$store.getters.isAuthenticated,
        num:0,
        itemlist:{},
        mark:'',
        player:{
          music:
            {
              title: 'secret base~君がくれたもの~',
              artist: 'Silent Siren',
              src: '#',
              pic: '#'
            }
          },
          list:[ 
            ]
        }
    },
    methods:{
      async getSum(){
        let res=await this.$axios.get('/user/total');
        const [{sum}]=res.data.data;
        this.num=sum;
        res =await this.$axios.get('/user/msgs');
        const items=res.data.data;
        this.itemlist = items;
      },
      async getMusic(){
        let res = await this.$axios.get("/music/list");
        this.list = res.data;
        this.player.music=this.list[0]
      }
    },
    mounted(){
      this.bus.$on('changeReply',()=>{
        this.getSum();
      });
    } 
}
</script>

<style scoped>
>>>.el-button--primary , >>> .el-button--primary {
  background-color:#41B883;
  border-color:transparent;
}
>>>.el-button--danger{
  background-color: #eea2a4;
  border-color:transparent;
}
>>>.el-button--default{
  background-color: #eea2a4;
  color: white;
  border-color:transparent;
}
.center{
  margin-top: .5rem !important;
    max-width: 1100px;
    margin: 0 auto;
}
  #message{
    background-color: #FFF;
    margin-left: .5rem;
    padding:25px;
    border-radius: .3rem;
    border: 1px solid #eee;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
  }
</style>