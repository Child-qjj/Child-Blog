<template>
    <div id="section">
       <el-row :grutter="20">
            <ul class="infinite-list" v-infinite-scroll="load" style="overflow:auto">
                <li v-for="(blog,index) in blogs" class="infinite-list-item" :key="index">
                    <div class="icon">
                        <i class="el-icon-date"></i><span class="createTime" style="font-size:14px">{{blog.create_time | msgDateFormat}}</span>
                    </div>
                   <el-row>
                       <el-col :span="21">
                                <div class="article_title" style="margin: .5rem 0 1rem;
                                white-space: nowrap;
                                overflow: hidden;
                                text-overflow: ellipsis;"
                                >
                                <!-- <p style="font-size: 1.4rem;
                                    font-weight: 600;
                                    line-height: 1.2;
                                    color: #2e3135;">
                                    {{blog.title}}
                                </p> -->
                                <router-link :to="`page?list=${blog.h_id}`" class="title">{{blog.title}}</router-link>
                                </div>
                       </el-col>
                       <el-col v-if="blog.cover_img" :span="3">
                            <div class="demo-image__lazy">
                                <el-image style="width: 60px; height: 60px" :src="blog.cover_img" lazy></el-image>
                                <!-- <img :src="blog.cover_img" alt="" width="60"> -->
                            </div>
                       </el-col>
                   </el-row>
                    <div class="linkto" style="text-align:right;">
                        <span><i class="el-icon-view"></i></span>
                        <el-link type="primary" @click="linkto(blog.h_id)">
                            <span>查看全文</span>
                            <span>
                                <i class="el-icon-arrow-right"></i>
                            </span>
                        </el-link>
                    </div>
                </li>
            </ul>
       </el-row>
    </div>
</template>

<script>
import { addCodeBtn } from '../../utils/mavon'
export default {
    name:'showInfo',
    props:['blogs'],
    data(){
        return{
             count: 0,
        }
    },
    created(){
      this.$nextTick(_ => {
        addCodeBtn()
    })  
    },
    methods:{
        load () {
            this.count += 2
        },
        linkto(id){
            this.$router.push(`/page?list=${id}`);
        }
    },
}
</script>

<style  scoped>
a.title{
    font-size: 1.4rem;
    font-weight: 600;
    line-height: 1.2;
    text-decoration: none;
    color: #2e3135;
}
a.title:hover{
    text-decoration:underline;
}
a.title:visited{
    color: #909090;
}
p img{
    width: 60% !important;
}
#section{
    background-color: #FFF;
    margin-left: .5rem;
    padding: .3rem;
    border-radius: .3rem;
    border: 1px solid #eee;
}
ul{
    list-style: none;
}
li.infinite-list-item{
    border-bottom: 1px solid #e8e8e8;
    text-align: left;
}
i.el-icon-view{
    padding-right: 5px;
}
</style>