<template>
    <div id="lists">
        <h4 style="text-align:left;">total:{{num}}</h4>
        <div id="msgs">    
            <div v-for="(item,id) in itemlist" :key="id" class="items">
                <div class="left">
                    <Avatar
                        :username="item.name"
                        style="vertical-align:middle"
                        color="#fff"
                        :inline="true"
                        :size="40"
                    >
                    </Avatar>
                </div>
                <div class="right">
                    <div class="right-top">
                        <div class="name" style="margin-right:10px;">{{item.name}}</div>
                        <div class="cookie" style="margin-right:20px;">{{item.cookie}}</div>
                        <div class="create_time" style="flex:1;text-align:right;">{{ item.date | msgDateFormat }}</div>
                    </div>
                    <div class="right-bottom">
                        <div class="minds">{{item.body}}</div>
                        <div class="reply" v-if="item.reply">
                            <i class="el-icon-delete" @click="delReply(item.id)" v-if="authorization"></i>
                            <i>回复:</i>
                            <span>{{item.reply}}</span>
                        </div>
                    </div>
                </div>
                <div class="reply-button" v-if="authorization">
                    <Dialog :id="item.id"></Dialog>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Avatar from 'vue-avatar'
import Dialog from "./dialog"
export default {
    name:'reply',
    props:['itemlist','num','authorization'],
    components:{
        Avatar,
        Dialog
    },
    methods:{
        delReply(id){
            this.$confirm('确认删除？')
                    .then(_ => {
                    try {             
                        this.$axios.post(`/admin/update/reply/${id}`)
                            .then(res=>{
                                this.$message({
                                    type: 'success',
                                    message: '已删除'
                            });
                                this.bus.$emit('changeReply');
                            })
                    } catch (err) {
                        console.log(err);
                    }
                    })
                    .catch(_ => {});             
            }
        },
}
</script>

<style scoped>
.cookie{
    background-color: #ccc;
}
.left{
  width: 6%;
}
.right{
  width: 94%;
}
.right-bottom{
    padding: 10px 0;
    line-height: 2;
}
.right-top {
    width: 100%;
    display: flex;
}
.items {
    display: flex;
    width: 100%;
    padding: 20px;
    box-sizing: border-box;
    border-bottom: 1px solid #ececec;
}
.minds {
    padding-bottom: 10px;
    text-align: left;
}
.reply {
    text-align: left;
}
.answer{
  display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    padding-top: 10px;
    border-top: 1px solid #ececec;
}
.reply i{
  padding-right: 10px;
}
.reply-button {
    padding: 20px;
}
.reply:hover{
  background-color: #cecece;
}
.reply i.el-icon-delete{
  cursor: pointer;
}
</style>