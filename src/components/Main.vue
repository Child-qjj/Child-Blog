<template>
  <div id="main">
      <el-row :gutter="20">
        <el-col :span="17"><slot name="content"></slot></el-col>
        <el-col :span="7">
          <el-row :gutter="20" id="stiky"><slot name="Info"></slot></el-row>
        </el-col>
      </el-row>
  </div>
</template>

<script>
export default {
    name:'mainArea',
}
</script>

<style scoped>
  #main{
    margin-top: .5rem !important;
    max-width: 1100px;
    margin: 0 auto;
  }
</style>

