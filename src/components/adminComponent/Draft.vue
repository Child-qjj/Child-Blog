<template>
 <div class="draft">
    <h1>草稿页面就不写了,期待后续吧!</h1>
    <h2>虽然接口写好了QAQ</h2>
    <el-page-header @back="goBack" content=""></el-page-header>
 </div>
</template>
<script>
export default {
  name:'draft',
  methods:{
    goBack(){
            this.$router.push('/admin');
        },
  }
}
</script>