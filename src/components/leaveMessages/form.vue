<template>
    <div id="form">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-row>
        <el-col :span="12">
            <el-form-item label="邮箱" prop="email">
                <el-input v-model="ruleForm.email" placeholder="请输入正确邮箱地址"></el-input>
            </el-form-item>
        </el-col>
        <el-col :span="12">
            <el-form-item label="昵称" prop="name" placeholder="请输入昵称">
                <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
        </el-col>
        </el-row>
        <el-row>
            <el-form-item label="留言" prop="desc">
                <el-input type="textarea" v-model="ruleForm.desc" placeholder="留点建议"></el-input>
            </el-form-item>
        </el-row>
        <el-row>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">发布留言</el-button>
                <el-button @click="resetForm('ruleForm')">清空</el-button>
            </el-form-item>
        </el-row>
    </el-form>
    </div>
</template>
<script>
  export default {
    data() {
      return {
        ruleForm: {
          name: '',
          email:'',
          desc: ''
        },
        rules: {
          email: [
            { required: true, message: '请输入邮箱地址', trigger: 'blur' },
            { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
          ],
           name: [
            { required: true, message: '昵称不为空', trigger: 'blur' },
            { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
          ],
          desc: [
            { required: true, message: '凑个字数也行啊', trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid){
           try {
              this.$axios.post('/user/newMessages',this.ruleForm)
                .then(res=>{
                  this.$message({
                    message:"感谢您的留言!",
                    type:'success'
                  })
                  this.resetForm(formName);
                  this.bus.$emit('changeReply');
                })
           } catch (err) {
             console.log(err);
           }
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>
<style scoped>
    .el-textarea >>> .el-textarea__inner{
       height:210px;
    }
</style>