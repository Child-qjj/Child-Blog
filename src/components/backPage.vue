<template>
    <el-page-header @back="goBack" content="">
    </el-page-header>
</template>

<script>
export default {
    name:'Back',
    methods: {
      goBack() {
        this.$router.push('/');
      }
    }
}
</script>