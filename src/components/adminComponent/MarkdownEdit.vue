<template>
    <div id="markdown">
        <div id="header">
            <el-row class="top">
                <el-col :span='8'>
                    <div class="left">
                        <input  placeholder="输入文章标题..." v-model="text"
                        spellcheck="false" maxlength="80" class="title-input title-input">
                    </div>
                </el-col>
                <el-col :span="3"   style="padding: 5px;">
                    <div class="cover-title">
                        <el-popover
                                placement="bottom"
                                width="auto"
                                trigger="click">
                            <div class="content"> 
                                <p style="  margin-bottom: 1.2rem;
                                        font-size: 1.56rem;
                                        font-weight: 700;
                                        color: rgba(119,127,141,.8);"
                                >添加封面大图</p>
                                <upload  @upload-img="value" :img_url="img_url"></upload>
                            </div>
                            <i class="el-icon-picture-outline" style="cursor:pointer;" slot="reference"></i>
                        </el-popover>   
                    </div>
                </el-col>
                <el-col :span="3" style="padding: 7.5px;">
                    <div class="title" style="cursor:pointer;">{{show?"文章将会保存至":"文章已保存至"}}<a class="text" href="/admin/Draft-list">草稿</a></div>
                </el-col>
                <el-col :span="6">
                    <div class="right"  style="display:inline-flex">
                        <div class="publish" style="display:inline-flex">
                            <div class="toggle-btn"><el-button @click="publish()"><span  class="title">发布</span></el-button><i class="icon ion-arrow-down-b"></i></div>
                        </div>
                    </div>
                </el-col>
                <el-col :span="3">
                    <el-page-header @back="goBack" content="">
                    </el-page-header>
                </el-col>
            </el-row>
        </div>
            <mavon-editor 
            v-model="content"
            ref="md" 
            @change="change"
            @imgAdd="handleEditorImgAdd"
            @save="save"
            style="
            box-shadow:none;
            border: aliceblue solid 1px;
            min-height: 670px;"
        ></mavon-editor>
<!-- @imgDel ="$imgDel"
 @imgAdd ="imgAdd" 
        <button @click="submit">提交</button> -->
    </div>
</template>

<script>
import {mavonEditor} from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import 'mavon-editor/dist/markdown/github-markdown.min.css'
import upload from './upload'
export default {
    name:'markdown',
    components: {
        mavonEditor,   
        upload
    },
    data() {
        return {
            show:true,
            content:'', // 输入的markdown
            html:'',    // 及时转的html
            text:'',
            base64:'',
            img_url:'',
            id:''
        }
    },
    // computed:{
    //    user:function () {
    //         return ;
    //     }
    // },
    created(){
        this.show=true;
        if (this.$route.params.data) {
            let data=this.$route.params.data;
            this.content=data.md;
            this.text=data.title;
            this.img=data.cover_img;
        }
    },
    methods: {
        goBack(){
            this.$router.push('/admin');
        },
        save(value,render){
            // console.log(value);
            // console.log(render);
            let newMark={
                md:value,
                author:this.$store.getters.user.user,
                title:this.text,
                cover_img:this.base64,
                show:this.show,
                id:this.id
            }
            if (this.$route.params.data){
                this.$axios.post(`/admin/update/markdown/${this.$route.params.data.id}`,newMark)
                    .then(res=>{
                        this.show=false;
                    })
                    .catch(err=>console.log(err))
            }
            else{
                this.$axios.post('/admin/essay/new',newMark)
                    .then(res=>{
                        this.show=false;
                        if (res.data.data) {
                            this.id=res.data.data;
                        }
                    })
                    .catch(err=>console.log(err))
            }
        },
        value(data){
            this.base64=data;
        },
        publish(){
            this.$confirm('你将要发布文章, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
                center: true
                })
                .then(() => {
                    const newHtml={
                        html:this.html,
                        author:this.$store.getters.user.user,
                        title:this.text,
                        cover_img:this.base64,
                        md:this.content
                    }
                    if (this.$route.params.data){
                        this.$axios.post(`/admin/update/article/${this.$route.params.data.id}`,newHtml)
                            .then(res=>{
                                console.log("OK");
                            })
                            .catch(err=>console.log(err))
                                this.$message({
                                    type: 'success',
                                    message: '发布成功!'
                            });
                                this.$router.push('/');
                    
                    } else {  
                        this.$axios.post('/admin/essay/new',newHtml)
                            .then(res=>{
                                console.log("OK");
                            })
                            .catch(err=>console.log(err))
                        this.$message({
                            type: 'success',
                            message: '发布成功!'
                        });
                        this.$router.push('/');
                        }
                })
                .catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消发布'
                });
            });
        },
        // 所有操作都会被解析重新渲染
        change(value, render){
            // render 为 markdown 解析后的结果[html]
            this.html = render;
          //  this.save(value,render);
        },
        // 提交
        // submit(){
        //     console.log(this.content);
        //     console.log(this.html);
        // }
        async  handleEditorImgAdd(pos, file){
        //     // 第一步.将图片上传到服务器.
            // let formdata = new FormData();
            // formdata.append('image', $file);
        //   this.$axios({
        //        url: 'http://39.108.125.224:8080/image',
        //        method: 'post',
        //        data: formdata,
        //        headers: { 'Content-Type': 'multipart/form-data' },
        //     }).then((url) => {
        //        // 第二步.将返回的url替换到文本原位置![...](0) -> ![...](url)
        //        /**
        //        * $vm 指为mavonEditor实例，可以通过如下两种方式获取
        //        * 1. 通过引入对象获取: `import {mavonEditor} from ...` 等方式引入后，`$vm`为`mavonEditor`
        //        * 2. 通过$refs获取: html声明ref : `<mavon-editor ref=md ></mavon-editor>，`$vm`为 `this.$refs.md`
        //        */
        //        $vm.$img2Url(pos, url);
        //    })
            var formData = new FormData()
            formData.append('imgFile', file)
            const res = await this.$axios({
                method: 'post',
                url: `/pic/upload`,
                headers: {
                'Content-Type': 'multipart/form-data',
                },
                data: formData,
            })
             this.$refs.md.$img2Url(pos,res.data.url);
        },
    },
    mounted() {

    }
}
</script>

<style scoped>
a.text{
    color: #ccc;
    margin: 0 0 0 .4em;
    padding: .2em .4em;
    /* color: inherit; */
    text-decoration: none;
    border: 1px solid currentColor;
    border-radius: 2px;
}
.top.el-row {
    padding: 10px;
}
#header{
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    top: 0;
    left: 0;
    right: 0;
    padding: 0 1.4rem;
    height: 3.334rem;
    background-color: #fff;
    border-bottom: 1px solid #ddd;
    z-index: 100;
}
.toggle-btn{
    font-size: 1.334rem;
    white-space: nowrap;
    color: #007fff;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}
i.el-icon-picture-outline {
    font-size: 25px;
}
.cover-title {
    display: inline-flex;
}
.status-text a {
    border: black solid 1px;
    text-decoration: none;
    color: #ddd;
}
.with-padding{
    padding-left: 1.2rem;
    padding-right: 1.2rem;
}
.status-text{
    font-size: 1.334rem;
    white-space: nowrap;
    color: #ddd;
    cursor: default;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}

.title-input{
    margin: 0;
    padding: 0;
    font-size: 2rem;
    font-weight: 700;
    color: #000;
    border: none;
    outline: none;
}
button, input {
    overflow: visible;
}
</style>