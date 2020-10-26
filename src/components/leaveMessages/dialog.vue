<template>
    <div class="dialog">
        <el-row>
            <el-col :span="30">
                <el-button type="primary" icon="el-icon-edit" circle @click="dialogFormVisible = true"></el-button>
            </el-col>
            <el-col :span="30">
                <el-button type="danger" icon="el-icon-delete" circle @click="delMsg(id)"></el-button>
            </el-col>
        </el-row>
        <el-dialog title="回复内容" :visible.sync="dialogFormVisible" :before-close="handleClose">   <!-- @close="changeVisible"  -->
            <el-form :model="form">
                <el-form-item label="回复" :label-width="formLabelWidth">
                <el-input v-model="form.reply" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible =false">取 消</el-button>
                <el-button type="primary" @click="handleForm(id)">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name:'my-dialog',
    props:['id'],
    data(){
        return{
        formLabelWidth: '120px',
        dialogFormVisible:false,
        form:{
            reply:""
            }
        }
    },
    methods:{
        handleForm(id){
            this.dialogFormVisible=false;
            try {             
                this.$axios.post(`/admin/update/msgs/${id}`,this.form)
                    .then(res=>{
                        this.$message({
                            type: 'success',
                            message: '回复成功'
                    });
                     //   this.reload();
                       this.bus.$emit('changeReply');
                    })
              
            } catch (err) {
                console.log(err);
            }
                    
        },
        delMsg(id){
            this.$confirm('确认删除该留言？')
                .then(_ =>{
                    this.$axios.delete(`/admin/delete/msgs/${id}`)
                        .then(res=>{
                            this.$message({
                                type: 'success',
                                message: '删除成功'
                            });
                            this.bus.$emit('changeReply');
                        })
                })
                .catch(_ =>{})
        },
        handleClose(done){
            this.$confirm('确认关闭？')
                .then(_ => {
                    done();
                })
                .catch(_ => {});
        }
    }
}
</script>

<style>

</style>