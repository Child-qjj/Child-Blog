<template>
    <div id="info">
        <div class="avatar">
            <el-avatar :size="80" src="http://39.108.125.224:8080/image/back3.jpg"></el-avatar>
            <div style="margin-top:20px;font-size:large;color:skyblue;"><span>Child</span></div>
        </div>
        <div class="canI"><span>我的技术栈</span></div>
        <div class="skills">
            <el-tag>JavaScript</el-tag>
            <el-tag type="success">Vue.js</el-tag>
            <el-tag type="info">React.js</el-tag>
            <el-tag type="warning">HTML</el-tag>
            <el-tag type="danger">node.js</el-tag>
        </div>
        <div class="contact">
          <div class="sub">
              <el-divider>联系我</el-divider>
              <div class="items">
                    <div><el-tooltip class="item" effect="dark" :content="contact.GitHub" placement="top"><img src="../../assets/github.png"></el-tooltip></div>
                    <div><el-tooltip class="item" effect="dark" :content="contact.LeetCode" placement="top"><img src="../../assets/leetcode.png"></el-tooltip></div>
                    <div>
                        <el-tooltip class="item" effect="dark" :content="contact.QQ" placement="top">
                            <div class="content" slot="content"><img src="../../assets/IQCQ.png" alt="" width="100"></div>
                            <img src="../../assets/QQ.png"></el-tooltip>
                    </div>
                    <div>
                        <el-tooltip class="item" effect="dark" placement="top">
                            <div class="content" slot="content"><img src="../../assets/WeChat.png" alt="" width="100"></div>
                            <img src="../../assets/微信.png">
                        </el-tooltip>
                         <!-- <el-popover
                                placement="top"
                                width="auto"
                                trigger="click">
                            <div class="content">JJJS</div>
                            <img src="../../assets/微信.png" slot="reference">
                        </el-popover>    -->
                    </div>
              </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name:'showInfo',
    props:['contact'],
}
</script>

<style  scoped>
#info{
    background-color: #FFF;
    margin-left: .5rem;
    padding: .3rem;
    border-radius: .3rem;
    border: 1px solid #eee;
}
.avatar .el-col.el-col-7 {
    position: sticky;
    top: 61px;
    /* z-index: 999; */
}
.items img{
  width: 35%;
}
.items{
    padding:0 20px 20px;
}
.items div{
    display:table-cell;
}
.el-tag{
        margin: 20px;
}
.canI{
    font-size: small;
    margin-top: 25px;
}
</style>