<template>
   <div>
    <el-upload
        action="#"
        list-type="picture-card"
        :class="{disUoloadSty:noneBtnImg}"
        :on-change="imgChange"
        ref="upload"
        :auto-upload="false">
    <i slot="default" class="el-icon-plus"></i>
    <div slot="file" slot-scope="{file}">
      <img
        class="el-upload-list__item-thumbnail"
        :src="file.url" alt=""
      >
      <span class="el-upload-list__item-actions">
        <span
          class="el-upload-list__item-preview"
          @click="handlePictureCardPreview(file)"
        >
          <i class="el-icon-zoom-in"></i>
        </span>
        <span
          v-if="!disabled"
          class="el-upload-list__item-delete"
          @click="handleRemove(file)"
        >
          <i class="el-icon-delete"></i>
        </span>
      </span>
    </div>
</el-upload>
<el-dialog :visible.sync="dialogVisible">
  <img width="50%" :src="dialogImageUrl" alt="">
</el-dialog>
   </div>
</template>
<script>
//import {base64ToBlob} from '../../utils/base64ByBlob'
  export default {
    props:['img_url'],
    data() {
      return {
        noneBtnImg:false, 
        dialogImageUrl: '',
        dialogVisible: false,
        disabled: false,
        limit:1,
        base64:''
      };
    },
    created(){
    },
    methods: {
      handleRemove(file) {
        this.$refs.upload.handleRemove(file);
        this.noneBtnImg = false;
      },
      imgChange(file,fileList){
      // let reader = new FileReader();
      // reader.readAsArrayBuffer(file.raw);
      // reader.onload = function(e) {
      //   console.log(this.result);//this.result即为文件流的base64编码
      // }
          console.log(file);
          this.getBase64(file.raw).then(res =>{
          this.base64=res;
          this.$emit('upload-img',res);
      });
      //   this.base64.split(',')[1];
      //  base64ToBlob({b64data: this.base64, contentType: 'image/png'})
      //               .then(res => {
      //           //console.log(res.preview);
      //           this.$emit('upload-img',res.preview);
      //         })
        this.noneBtnImg = fileList.length >= this.limit;
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      getBase64(file) {
          return new Promise(function(resolve, reject) {
            let reader = new FileReader();
            let imgResult = "";
            reader.readAsDataURL(file);
            reader.onload = function() {
                imgResult = reader.result;
            };
            reader.onerror = function(error) {
                reject(error);
            };
            reader.onloadend = function() {
                resolve(imgResult);
            };
        });
      },
    },
  }
</script>
<style>
.disUoloadSty .el-upload--picture-card{
  display:none;   /* 上传按钮隐藏 */
}
</style>