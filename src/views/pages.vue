<template>
    <div id="page">
        <div class="nav">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>文章</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
       <div class="content">
            <article>
            <h1>{{art.title}}</h1>
            <section v-html="art.html" v-highlight></section>
            </article>
       </div>
    </div>
</template>
<script>
export default {
    name:'page',
    data(){
        return{
            art:''
        }
    },
    created(){
        this.getArt();
    },
    methods:{
       async getArt(){
           try {
                const res=await this.$axios.get(`/user/articles/${this.$route.query.list}`)
                const {data}=res.data;
                this.art=data[0];
                //console.log(res);
           } catch (error) {
               
           }
                    
        }
    },
}
</script>

<style scoped>
    #page{
        background-color: #FFF;
        margin-left: .5rem;
        padding:25px;
        border-radius: .3rem;
        border: 1px solid #eee;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
    }
</style>