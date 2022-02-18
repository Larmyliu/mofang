<template>

  <div class="container">
    <el-header>报表配置</el-header>
    <div class="selectBox">
      <el-select v-model="value" placeholder="请选择" multiple >
        <el-option v-for="item in nameList" :key="item" :label="item" :value="item">
        </el-option>
      </el-select>
      <el-button type="primary" @click="getData">生成报表</el-button>
    </div>
    <ve-line :data="chartData" :after-set-option="afterSetOption"></ve-line>
  </div>


</template>

<script>
  import VeLine from 'v-charts/lib/line.common'
  export default {
    name: "HelloWorld",
    components: {
      VeLine
    },
    data() {
      return {
        id: '',
        nameList: [],
        value: [],
        chartData: {
          columns: ['times', 'PV'],
          rows: [
            { 'times': '1', 'PV': 1231 },
            { 'times': '2', 'PV': 1223 },
            { 'times': '3', 'PV': 2123 },
            { 'times': '4', 'PV': 4123 },
            { 'times': '5', 'PV': 3123 },
            { 'times': '6', 'PV': 7123 }
          ]
        },
        XAxis:[]
      };
    },
    methods: {
      getNameList() {
        let req = {
          userId: window.localStorage.getItem("userid")
        }
        this.$Apply.dataReport.getListName(req).then(res => {
          this.nameList = res.data.data
        })
      },
      getData() {
        let req = {
          name: this.value.join(",")
        }
        this.$Apply.dataReport.getDataByName(req).then(res => {
          let result = res.data.data
          let nameLegend = []
          let dataSeries = []
          let XaxisMax = 0;
          for (let i = 0; i < result.length; i++) {
            nameLegend.push(result[i].name)
            let seriesObj = {}
            seriesObj.name = result[i].name
            seriesObj.type = "line"
            seriesObj.data = result[i].source_data
            XaxisMax = XaxisMax < result[i].source_data.length ? result[i].source_data.length : XaxisMax
            dataSeries.push(seriesObj)
          }

          this.chartData.columns = nameLegend
          this.chartData.rows = dataSeries
          this.XAxis = this.getXAxis(XaxisMax)
        })
      },
      getXAxis(num){
        let arr = [];
        for(let i = 1; i <= num; i++){
          arr.push(i)
        }
        return arr;
      },
      afterSetOption(chartObj) {

        var self = this;
        let obj = {
          legend: {
            data: self.chartData.columns
          },
          toolbox: {
            feature: {
              saveAsImage: {}
            }
          },
          xAxis: {
            type: 'category',
            data: self.XAxis
          },
          yAxis: {
            type: 'value'
          },
          series: self.chartData.rows
        }
        debugger
        console.log(obj)
        chartObj.setOption(obj)

      }
    },
    created() {
      this.getNameList()
    }
  };

</script>

<style scoped>
  .container {
    width: 80%;
    margin: 0 auto;
  }

  .chart {
    height: 400px;
  }

  .selectBox {
    display: flex;
    margin: 10px;
  }

</style>
