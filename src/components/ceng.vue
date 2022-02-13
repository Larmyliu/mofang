<template>
  <div>
    <el-row>
      <el-col :span="5" :offset="1">
        <el-slider v-model="speed" :min="100" :max="500" :step="100" :vertical="mobile" :height="height" :disabled="status"></el-slider>
      </el-col>
      <el-col :span="5" :offset="off" class="step">
        <span v-transition class="msg">{{steps}}</span>
      </el-col>
      <el-col :span="5" :offset="off">
        <scanner :randomRotate=randomRotateLoading :autoRest=autoRestRunning :acceptString=acceptStringRunning @accept="statusChange" />
        <el-button type="primary" icon="el-icon-refresh" circle @click="randomRotate" :loading=randomRotateLoading :disabled="status">随机</el-button>
        <el-button type="success" icon="el-icon-success" circle @click="autoResetV1" :loading=autoRestRunning :disabled="status">还原</el-button>
        <el-button type="success" icon="el-icon-arrow-right" circle @click="autoRestOneStep" :disabled="status">单步还原</el-button>
        <el-button type="success" icon="el-icon-edit-outline" circle @click="randomRotateAndRest" :disabled="status">报表生成</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="23" class="step">
        <span class="msg txt" @click="changePlay" name='txt'>{{play}}</span>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="23" class="step">
        <span class="msg txt" @click="selectMethod" v-show="play==='练习模式'" name='txt'>{{method}}</span>
      </el-col>
    </el-row>
    <el-dialog :visible.sync="dialogVisible" :width="width">
      <el-select v-model="method" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </el-dialog>
  </div>
</template>

<script>
// import {  autoRestOneStep, changeSpeed, acceptStringRunning, stepCount, acceptMethod, clearAll, autoRunOneStep } from '../utils/Rubik.js'
// import {init,randomRotate, autoResetV1, stepCount, autoRestRunning,randomRotateLoading, acceptStringRunning,acceptMethod, isRotating } from '../utils/ceng'
import {init,randomRotate, autoResetV1, stepCount, autoRestRunning, isRotating, isAutoReset} from '../utils/ceng'
import { initBackground } from '../utils/background.js'
import scanner from './scanner'

export default {
  name: 'Ceng',
  components: {
    scanner
  },
  data () {
    return {
      randomRotateLoading: false,
      autoRestRunning: false,
      acceptStringRunning: false,
      speed: 200,
      off: 3,
      mobile: false,
      height: '',
      width: '',
      steps: 0,
      play: '自由模式',
      method: '请选择样式',
      dialogVisible: false,
      options: [{
        value: '六面回字',
        label: '六面回字'
      }, {
        value: '四色回字',
        label: '四色回字'
      }, {
        label: '对称棋盘',
        value: '对称棋盘'
      }, {
        label: '循环棋盘',
        value: '循环棋盘'
      }, {
        label: '六面十字',
        value: '六面十字',
      }, {
        label: '四面十字',
        value: '四面十字'
      }, {
        label: '六面彩条',
        value: '六面彩条'
      }, {
        label: '六面三条',
        value: '六面三条'
      }]
    }
  },

  created() {
    // var _this = this;
    // document.onkeydown = function(e) {
    //     let key = window.event.keyCode
    //     if (key === 32 && !_this.status) {
    //         _this.autoRestOneStep()
    //     }
    // }
  },

  mounted() {
    if(this._isMobile()) {
      this.off = 4
      this.mobile = true
      this.height = '150px'
      this.width = String(window.innerWidth / 2) + 'px'
    }
    else {
      this.width = String(window.innerWidth / 8) + 'px'
    }
    init(this._isMobile())
    setInterval(this.updateTime, 100)
    initBackground()

    // LBBRRURRRDDRDDLDLDFFFFFFFFFUUUUUDUBLBDBLBBLLBLRURLBRUD
    // LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL
    // DBULUFLUBLDFFRLBLRFFDRFLLUUBBRDDUURDFDDBLULRURDRBBRBFF
  },

  methods: {
    async randomRotateAndRest(){
      this.$prompt('请输入随机还原次数', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern: /^([1-9]\d*)$/,
          inputErrorMessage: '请输入正确的数字'
        }).then(async ({ value }) => {
          this.$message({
            type: 'success',
            message: `你的数字输入的是: ${value}，正在执行中，请勿关闭页面`
          });
          this.beginInputCountsRest(value)
        })
    },
    async beginInputCountsRest(value){
      console.log(+value)
      let resetCountList = []
      let i = 0;
      while(i < +value){

        if(this.randomRotateLoading == false){

          await this.randomRotatePromise().then(()=> this.sleep(1000)).then(() => this.autoResetV1Promise()).then(()=> this.sleep(1000))
          .then(() => {
            i++;
            resetCountList.push(this.steps)
          })
        }
      }
      let req = {
        name: `Ceng_${((new Date).getTime())}`,
        source_data: resetCountList.join(",")
      }
      console.log("上报"+resetCountList)
      this.$Apply.dataReport.uploadData(req).then((res) => {
        console.log(res)
      }).catch((err) => {
          console.log(err)
      })
    },
    randomRotatePromise() {
      return new Promise(async(resolve) => {
        console.log("随机开始")
        await this.randomRotate()
        console.log("随机结束")
        resolve()
      }, (reject) => {
        reject()
      })
    },
    async randomRotate() {
      if(this.play === '自由模式') {
        this.randomRotateLoading = true
        await randomRotate(this.speed)
        while(this.randomRotateLoading) {
          await this.sleep(this.speed*2)
          this.randomRotateLoading = isAutoReset
        }
      }
      else if(this.play === '练习模式') {
        clearAll()
      }
    },
    async autoResetV1Promise(){
      this.autoRestRunning = true
      console.log("还原开始")
      await autoResetV1(this.speed)
      console.log("还原结束")
      while(this.autoRestRunning) {
        await this.sleep(this.speed*2)
        this.autoRestRunning = autoRestRunning
      }
    },
    async autoResetV1() {
      if(this.play === '自由模式') {
        this.autoRestRunning = true
        autoResetV1(this.speed)
        while(this.autoRestRunning) {
          await this.sleep(this.speed*2)
          this.autoRestRunning = autoRestRunning
        }
      }
      else if(this.play === '练习模式') {
        switch(this.method) {
          case '六面回字':
            acceptMethod("U' D F' B L R' U' D", this.speed)
            break
          case '四色回字':
            acceptMethod("B2 L R B L2 B F D U' B F R2 F' L R", this.speed)
            break
          case '对称棋盘':
            acceptMethod("L2 R2 F2 B2 U2 D2", this.speed)
            break
          case '循环棋盘':
            acceptMethod("D2 F2 U' B2 F2 L2 R2 D R' B F D' U L R D2 U2 F' U2", this.speed)
            break
          case '六面十字':
            acceptMethod("B2 F' L2 R2 D2 B2 F2 L2 R2 U2 F'", this.speed)
            break
          case '四面十字':
            acceptMethod("D F2 R2 F2 D' U R2 F2 R2 U'", this.speed)
            break
          case '六面彩条':
            acceptMethod("F2 U2 F2 B2 U2 F B", this.speed)
            break
          case '六面三条':
            acceptMethod("U2 L2 U2 L2 U2 L2 U2 R2 U2 R2 U2 R2 U D L2 R2", this.speed)
            break
          default:
            return '请选择样式'
        }
        this.playMethod()
      }
    },

    async autoRestOneStep() {
      if(this.play === '自由模式') {
        this.autoRestRunning = true
        autoRestOneStep(this.speed)
      }
      else if(this.play === '练习模式') {
        this.autoRestRunning = true
        switch(this.method) {
          case '六面回字':
            autoRunOneStep("U' D F' B L R' U' D", this.speed, this.steps)
            break
          case '四色回字':
            autoRunOneStep("B2 L R B L2 B F D U' B F R2 F' L R", this.speed, this.steps)
            break
          case '对称棋盘':
            autoRunOneStep("L2 R2 F2 B2 U2 D2", this.speed, this.steps)
            break
          case '循环棋盘':
            autoRunOneStep("D2 F2 U' B2 F2 L2 R2 D R' B F D' U L R D2 U2 F' U2", this.speed, this.steps)
            break
          case '六面十字':
            autoRunOneStep("B2 F' L2 R2 D2 B2 F2 L2 R2 U2 F'", this.speed, this.steps)
            break
          case '四面十字':
            autoRunOneStep("D F2 R2 F2 D' U R2 F2 R2 U'", this.speed, this.steps)
            break
          case '六面彩条':
            autoRunOneStep("F2 U2 F2 B2 U2 F B", this.speed, this.steps)
            break
          case '六面三条':
            autoRunOneStep("U2 L2 U2 L2 U2 L2 U2 R2 U2 R2 U2 R2 U D L2 R2", this.speed, this.steps)
            break
          default:
            return '请选择样式'
        }
      }

      while(this.autoRestRunning) {
        await this.sleep(this.speed*1.5)
        this.autoRestRunning = isRotating
      }
    },

    async statusChange() {
      this.acceptStringRunning = true
      while(this.acceptStringRunning) {
        await this.sleep(100)
        this.acceptStringRunning = acceptStringRunning
      }
    },

    async playMethod() {
      this.acceptStringRunning = true
      while(this.acceptStringRunning) {
        await this.sleep(this.speed*1.5)
        this.acceptStringRunning = acceptStringRunning
      }
    },

    sleep(ms) {
      console.log("暂停1000ms")
      return new Promise(resolve => setTimeout(resolve, ms));
    },

    _isMobile() {
      let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
      document.getElementsByName('txt').forEach(span => {
        span.style.fontSize = '26px'
      })
      return flag
    },

    updateTime() {
      // debugger
      this.steps = stepCount
      this.autoRestRunning = isRotating
    },

    changePlay() {
      if(this.status)
        return
      if(this.play === '自由模式')
        this.play = '练习模式'
      else
        this.play = '自由模式'
    },

    selectMethod() {
      if(this.status)
        return
      this.dialogVisible = true
    }
  },

  computed: {
    status() {
      console.log(`当前步数${this.steps}, 当前状态${this.autoRestRunning}`)
      return (this.randomRotateLoading || this.autoRestRunning)
    }
  },

  watch: {
    speed() {
      changeSpeed(this.speed)
    },

    method() {

      this.dialogVisible = false
      switch(this.method) {
        case '六面回字':
          acceptMethod("U' D F' B L R' U' D", this.speed)
          break
        case '四色回字':
          acceptMethod("B2 L R B L2 B F D U' B F R2 F' L R", this.speed)
          break
        case '对称棋盘':
          acceptMethod("L2 R2 F2 B2 U2 D2", this.speed)
          break
        case '循环棋盘':
          acceptMethod("D2 F2 U' B2 F2 L2 R2 D R' B F D' U L R D2 U2 F' U2", this.speed)
          break
        case '六面十字':
          acceptMethod("B2 F' L2 R2 D2 B2 F2 L2 R2 U2 F'", this.speed)
          break
        case '四面十字':
          acceptMethod("D F2 R2 F2 D' U R2 F2 R2 U'", this.speed)
          break
        case '六面彩条':
          acceptMethod("F2 U2 F2 B2 U2 F B", this.speed)
          break
        case '六面三条':
          acceptMethod("U2 L2 U2 L2 U2 L2 U2 R2 U2 R2 U2 R2 U D L2 R2", this.speed)
          break
        default:
          return '请选择样式'
      }
      this.playMethod()
    }
  }
}
</script>

<style scoped>
.refreash {
  align-content: left;
}

.el-button+.el-button {
  margin-left: 0
}

.step {
  text-align: center;
  margin-top: 10px;
  font-size: 40px;
}

.msg {
  transition: all .3s ease;
  height: 30px;
  padding: 10px;
  overflow: hidden;
  color: blanchedalmond;
}

.msg.v-enter, .msg.v-leave {
  height: 0;
  padding: 0 10px;
  opacity: 0;
}

.txt {
  z-index: 9;
  -webkit-user-select: none;
  cursor: pointer;
}
</style>
