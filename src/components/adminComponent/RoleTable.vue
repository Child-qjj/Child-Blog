<template>
  <!-- <el-row>
    <el-col :span="24"> -->
      <el-table :data="user_table.data.filter(data => !search||data.user.toLowerCase().includes(search.toLowerCase()))"  highlight-current-row>
        <el-table-column  type="index" label="Index" width="80px"></el-table-column>
        <el-table-column
            label="Create_Date">
            <template slot-scope="scope">
              <span>{{scope.row.create_time |msgDateFormat}}</span>
            </template>
        </el-table-column>
        <el-table-column label="Name" prop="user"></el-table-column>
        <el-table-column v-for="(v,key) in user_table.header" :key="key" :prop=v.field :label=v.title>
          <template slot-scope="scope">                         
            <span v-if="scope.row.isSet">
              <el-input size="mini" placeholder="请输入内容" v-model="user_table.sel[v.field]"></el-input>                            
            </span>
            <span v-else>{{scope.row[v.field]}}</span>                                            
          </template>
        </el-table-column>
        <el-table-column
            label="Modify_Date">
            <template slot-scope="scope">
              <span v-if="scope.row.ta_modify_time">{{scope.row.ta_modify_time |msgDateFormat}}</span>
            </template>
        </el-table-column>
        <el-table-column
            align="right">
            <template slot="header" slot-scope="scope">
              <el-input
                v-model="search"
                @click="handleEdit(scope.$index,scope.row)"
                size="mini"
                placeholder="输入关键字搜索"/>
            </template>
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)">{{scope.row.isSet?"保存":'Edit'}}</el-button>
              <el-button
                size="mini"
                type="danger"
                v-if="!scope.row.isSet"
                @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
                <el-button
                size="mini"
                type="danger"
                v-if="scope.row.isSet"
                @click="handleCancel(scope.$index, scope.row)">Cancel</el-button>
            </template>
          </el-table-column>
      </el-table>
    <!-- </el-col>
  </el-row> -->
</template>
<script>
export default {
    name:'tab', 
      data(){
        return{
          search:'',
          form:'',
          user_table:{
            sel:null,
            header:[
              {title:"QQ",field:"QQ"},
              {title:"LeetCode",field:"LeetCode"},
              {title:"GitHub",field:"GitHub"},
              {title:"微信",field:"WeChat"},
              {title:"手机",field:"Phone"},
            ],
            data: []
          }
        }
      },
    created(){
      this.getUser();
    },
    methods: {
      handleEdit(index, row) {
        if (row.isSet) {   
            let data = JSON.parse(JSON.stringify(this.user_table.sel));
            this.$axios.post(`/admin/update/contact/${row.user_id}`,data)
                .then(res=>{
                  this.$message({
                    type: 'success',
                    message: "保存成功!"
                  });
                  this.getUser();
                  row.isSet = false;
                })
                .catch(err=>console.log(err))
        }
        else{
          this.user_table.sel = JSON.parse(JSON.stringify(row));
          row.isSet=true;
        }
      },
      handleDelete(index, row) {
        this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          console.log(row);
          this.$axios.delete(`/admin/delete/users/${row.user_id}`)
              .then(()=>{
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                });
                this.getUser();
              })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      },
      handleCancel(index, row) {
        row.isSet=false;
      },
      async getUser(){
        const res=await this.$axios.get('/admin/users');
        const {data}=res.data;
        data.map(i => {
          i.isSet=false;//给后台返回数据添加`isSet`标识
          return i;
        });
        this.user_table.data=data;
      },
    },
  }
</script>
<style scoped>
</style>