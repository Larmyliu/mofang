<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-setting"></i> 首页</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="box">
          <div class="show" @click="turnTo('Rubik')">
            <div class="imgBox">
              <!-- <img src="http://img.qdaily.com/article/article_show/20160606135634IwPNRlbpVzqFD3gf.jpg?imageMogr2/auto-orient/thumbnail/!755x450r/gravity/Center/crop/755x450/ignore-error/1" alt=""> -->
            </div>
            <div class="des">Kociemba</div>
          </div>
          <div class="show" @click="turnTo('Ceng')">
            <div class="imgBox">
              <!-- <img src="http://img.qdaily.com/article/article_show/20160606135634IwPNRlbpVzqFD3gf.jpg?imageMogr2/auto-orient/thumbnail/!755x450r/gravity/Center/crop/755x450/ignore-error/1" alt=""> -->
            </div>
            <div class="des">layer by layer</div>
          </div>
        </div>

    </div>
</template>

<script>
    export default {
        data: function(){
            return {}
        },
        methods:{
          turnTo(str){
            this.$router.push(str)
          }
        }
    }
</script>

<style scoped>
  .box{
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 90%;
    height: 80vh;
    /* background: #000; */
  }
  .show{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    width: 40%;
    height: 60vh;
    background: rgb(201 201 201);
    box-shadow: 11px -11px #eee;
    cursor: pointer;
  }
  .imgBox{
    width: 80%;
    height: 60%;
    background-image: url("http://img.qdaily.com/article/article_show/20160606135634IwPNRlbpVzqFD3gf.jpg?imageMogr2/auto-orient/thumbnail/!755x450r/gravity/Center/crop/755x450/ignore-error/1");
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center center;
  }
  .des{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 20%;
    font-size: 30px;
    font-weight: bold;
  }
</style>
