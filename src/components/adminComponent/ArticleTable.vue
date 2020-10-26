<template>
    <!-- <el-row>
        <el-col :span="24"> -->
            <el-table :data="essay_table.data.filter(data => !search||data.user.toLowerCase().includes(search.toLowerCase()))"  highlight-current-row
            >
                <el-table-column  type="index" label="Index" width="80px"></el-table-column>
                <el-table-column
                    label="创建时间">
                    <template slot-scope="scope">
                    <span>{{scope.row.create_time |msgDateFormat}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="作者" prop="author"></el-table-column>
                <!-- <el-table-column v-for="(v,key) in essay_table.header" :key="key" :prop=v.field :label=v.title>
                  <template slot-scope="scope">                         
                      <span v-if="scope.row.isSet">
                      <el-input size="mini" placeholder="请输入内容" v-model="essay_table.sel[v.field]"></el-input>                            
                      </span>
                      <span v-else>{{scope.row[v.field]}}</span>                                            
                  </template>
                </el-table-column> -->
                <el-table-column prop="title" label="文章标题">
                  <template slot-scope="scope">                         
                      <span v-if="scope.row.isSet">
                      <el-input size="mini" placeholder="请输入内容" v-model="essay_table.sel.title"></el-input>                            
                      </span>
                      <span v-else>{{scope.row.title}}</span>                                            
                  </template>
                </el-table-column>
                <el-table-column prop="md" label="文章内容">
                  <template slot-scope="scope">                         
                      <span v-if="scope.row.isSet">
                      <!-- <el-input size="mini" placeholder="请输入内容" v-model="essay_table.sel.html"></el-input> -->
                      <el-input type="textarea"  autosize placeholder="请输入内容" v-model="essay_table.sel.md"></el-input>                            
                      </span>
                      <span v-else>{{scope.row.md}}</span>                                        
                  </template>
                </el-table-column>
                <el-table-column
                    label="Modify_Date">
                    <template slot-scope="scope">
                    <span v-if="scope.row.modify_time">{{scope.row.modify_time |msgDateFormat}}</span>
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
                        @click="editTo(scope.row)">编辑</el-button>
                    <el-button
                        size="mini"
                        type="danger"
                        @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
                    </template>
                </el-table-column>
            </el-table>
        <!-- </el-col>
    </el-row> -->
</template>

<script>
export default {
    name:'tab-art',
     data(){
        return{
          search:'',
          form:'',
          essay_table:{
            sel:null,
            data: []
          }
        }
      },
    created(){
      this.getEssay();
    },
    methods: {
      editTo(data){
        this.$router.push({name:'markdown',params: { id:data.uid,data: data }});
      },
      handleDelete(index, row) {
        this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$axios.delete(`/admin/delete/articles/${row.h_id}`)
              .then(()=>{
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                });
                this.getEssay();
              })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      },
      async getEssay(){
        const res=await this.$axios.get('/admin/essay/html');
        const {data}=res.data;
        //console.log(data);
        this.essay_table.data=data;
      },
    },
}
</script>

<style>

</style>