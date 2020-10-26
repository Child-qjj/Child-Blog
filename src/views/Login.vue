<template>
    <div class="login">
        <div class="container">
            <div class="form">
                <el-form :model="loginUser" status-icon :rules="rules" ref="loginUser" label-width="80px" class="loginForm">
                    <el-form-item label="账号" prop="user">
                        <el-input v-model="loginUser.user" placeholder="请输入账号"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-input type="password" v-model="loginUser.password" autocomplete="off" placeholder="请输入密码"></el-input>
                    </el-form-item>
                    <el-form-item class="submit_btn">
                        <el-button class="submit_btn" type="primary" @click="submitForm('loginUser')">登陆</el-button>
                    </el-form-item>
                     <!-- <div class="tips">
                         <p>还没有账号?马上<router-link to='/login'>注册</router-link></p>
                     </div> -->
                </el-form>
            </div>
        </div>
    </div>
</template>
<script>
import jwt_decode from 'jwt-decode'
export default {
    name:'login',
    componets:{},
    data(){
        return{
            loginUser:{
                user:"",
                password:"",
            },
            rules:{
                user:[
                     { required: true, message: '账号不能为空', trigger: 'blur' }
                ],
                password:[
                   {required:true,message:'密码为空',trigger:'blur'},
                   { min: 6, max: 30, message: "长度在 6 到 30 个字符", trigger: "blur" }
                ]
            },
        };
    },
    methods:{
        submitForm(formName){
            this.$refs[formName].validate((valid)=>{
                if (valid) {
                    this.$axios.post('/user/login',this.loginUser)
                        .then(res=>{
                            this.$message({
                                message:"登陆成功",
                                type:'success'
                            });
                            // console.log(res.data);
                            const {token}=res.data;
                            // console.log(data);
                            // const { token } =res.data;
                            localStorage.setItem("loginToken",token);
                            const decoded=jwt_decode(token);
                            // //token存储到vuex
                            //console.log(decoded);
                             this.$store.dispatch("setIsAuthenticated",!this.isEmpty(decoded));
                             this.$store.dispatch("setUser",decoded);
                             this.$router.push('/admin');
                        })
                        .catch(err=>{console.log(err);})       
                }
                else{
                    return false;
                }
            });
        },
        isEmpty(value){
            return 
                value === undefined ||
                value === null ||
                (typeof value === "object"&&Object.keys(value).length===0)||
                (typeof value === "string"&&value.trim().length===0)
        }
    }
};
</script>
<style scoped>
   .login{
  position: relative;
  width: 100%;
  height: 100%;
}
.container {
  width: 370px;
  height: 210px;
  position: absolute;
  top: 10%;
  left: 34%;
  padding: 25px;
  border-radius: 5px;
  text-align: center;
}
/* .form_container .manage_tip .title {
  font-family: "Microsoft YaHei";
  font-weight: bold;
  font-size: 26px;
  color: #fff;
} */
.form {
    position: relative;
    top: 30%;
}
.loginForm {
  margin-top: 20px;
  background-color: #fff;
  padding: 20px 40px 20px 20px;
  border-radius: 5px;
  box-shadow: 0px 5px 10px #cccc;
}
.submit_btn {
  width: 100%;
}
.tips{
    position: relative;
    font-size: 13px;
    padding-left: 55%;
}
</style>