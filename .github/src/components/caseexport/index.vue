<template>
  <div>
    <template v-if="type === 0">
      <div>
        <h4>请选择导出内容</h4>
        <el-checkbox
          :indeterminate="isIndeterminate"
          v-model="checkAll"
          @change="handleCheckAllChange"
          >全选</el-checkbox
        >
        <div>
          <el-divider content-position="left">基本信息</el-divider>
          <el-checkbox-group v-model="baseInfodata" @change="baseInfo">
            <el-checkbox
              v-for="(item, index) in exportData.baseInfo"
              :label="index"
              :key="index"
              style="width:12%"
              >{{ item }}</el-checkbox
            >
          </el-checkbox-group>
        </div>
        <div>
          <el-divider content-position="left">金额/时间</el-divider>
          <el-checkbox-group v-model="amountdata" @change="amountTime">
            <el-checkbox
              v-for="(item, index) in exportData.amountTime"
              :label="index"
              :key="index"
              style="width:12%"
              >{{ item }}</el-checkbox
            >
          </el-checkbox-group>
        </div>
        <div>
          <el-divider content-position="left">处置相关</el-divider>
          <el-checkbox-group
            v-model="handleRelevantdata"
            @change="handleRelevant"
          >
            <el-checkbox
              v-for="(item, index) in exportData.handleRelevant"
              :label="index"
              :key="index"
              style="width:12%"
              >{{ item }}</el-checkbox
            >
          </el-checkbox-group>
        </div>
      </div>
    </template>
    <template v-if="type === 1">
      <div>
        <h4>请选择导出内容</h4>
        <el-checkbox
          :indeterminate="TisIndeterminate"
          v-model="TcheckAll"
          @change="handleTCheckAllChange"
          >全选</el-checkbox
        >
        <div>
          <el-divider content-position="left">案件信息</el-divider>
          <el-checkbox-group
            v-model="caseInfoData"
            @change="handleCheckedcaseInfo"
          >
            <el-checkbox v-for="(item,index) in exportData.caseInfo" :label="index" :key="index" style="width:12%">{{
              item
            }}</el-checkbox>
          </el-checkbox-group>
        </div>
        <div>
          <el-divider content-position="left">记录信息</el-divider>
          <el-checkbox-group
            v-model="followInfoData"
            @change="handleCheckedfollowInfo"
          >
            <el-checkbox v-for="(item,index) in exportData.followInfo" :label="index" :key="index" style="width:12%">{{
              item
            }}</el-checkbox>
          </el-checkbox-group>
        </div>
        <div>
          <el-divider content-position="left">记录筛选</el-divider>
          <label style="fontweight: 500">记录提交时间:</label>
          <el-date-picker clearable
            v-model="value"
            type="datetimerange"
            value-format="yyyy-MM-dd HH:mm:ss"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </div>
      </div>
    </template>
  </div>
</template>
<script>
import { caseexport , followexport} from "@/api/comment"
import { exportMethod } from "@/utils/export"
export default {
  props: ["exportData", "type" , "handleparams"],
  data() {
    return {
      isIndeterminate: true,
      TisIndeterminate:true,
      checkedCities: [],
      checkAll: false,
      TcheckAll:false,
      value: [],
      amountdata: [],
      handleRelevantdata: [],
      baseInfodata: [],
      exportField: [],
      followInfoData:[],
      caseInfoData:[]

    };
  },
  methods: {
    handleCheckAllChange(val) {
      if (val) {
        let arr = [];
        let arrs = [];
        let arrt = [];
        Object.keys(this.exportData.baseInfo).forEach((key) => {
          arr.push(key);
        });
        Object.keys(this.exportData.amountTime).forEach((key) => {
          arrs.push(key);
        });
        Object.keys(this.exportData.handleRelevant).forEach((key) => {
          arrt.push(key);
        });
        this.baseInfodata = arr;
        this.amountdata = arrs;
        this.handleRelevantdata = arrt;
        this.exportField = [...arr, ...arrs, ...arrt];
      } else {
        this.baseInfodata = [];
        this.amountdata = [];
        this.handleRelevantdata = [];
      }
      this.isIndeterminate = false;
    },
    baseInfo(value) {
      this.baseInfodata = value;
      this.exportField = [
        ...this.baseInfodata,
        ...this.amountdata,
        ...this.handleRelevantdata,
      ];
    },
    amountTime(val) {
      this.amountdata = val;
      this.exportField = [
        ...this.baseInfodata,
        ...this.amountdata,
        ...this.handleRelevantdata,
      ];
    },
    handleRelevant(val) {
      this.handleRelevantdata = val;
      this.exportField = [
        ...this.baseInfodata,
        ...this.amountdata,
        ...this.handleRelevantdata,
      ];
    },
    //处置
    handleTCheckAllChange(val){
        if (val) {
        let arr = [];
        let arrs = [];
        Object.keys(this.exportData.caseInfo).forEach((key) => {
          arr.push(key);
        });
        Object.keys(this.exportData.followInfo).forEach((key) => {
          arrs.push(key);
        });
        this.caseInfoData = arr;
        this.followInfoData = arrs;
        this.exportField = [...arr, ...arrs];
      } else {
        this.caseInfoData = [];
        this.followInfoData = [];
        this.handleRelevantdata = [];
      }
      this.isIndeterminate = false;
    },
    handleCheckedfollowInfo(val){
     this.caseInfoData = val;
      this.exportField = [
        ...this.caseInfoData,
        ...this.followInfoData,
      ];
    },
    handleCheckedfollowInfo(val){
     this.followInfoData = val;
      this.exportField = [
        ...this.caseInfoData,
        ...this.followInfoData,
      ];
    },
    handlerexportOk(){
      let params = Object.assign({},this.handleparams)
      params['exportField'] = this.exportField
      params['exportType'] = 0
      if(this.type === 1){
        params['createTimeStart'] = this.value[1]
        params['createTimeEnd'] = this.value[1]
        followexport(params).then(res=>{
           if(res.code===200){
             this.$emit('getcaseList')
            res.data.isAsync === 0 ? this.exportDownload(res.data.data.fileUrl) :this.$message.success('数据量较大请稍后')
          }
        })
      }else{
        caseexport(params).then(res=>{
          if(res.code===200){
             this.$emit('getcaseList')
            res.data.isAsync === 0 ? this.exportDownload(res.data.data.fileUrl) :this.$message.success('数据量较大请稍后')
          }
      })
      }
    },
    //导出下载
    exportDownload(item){
      this.$message.success('操作成功')
      exportMethod(item)
    }
  },
};
</script>
<style lang="scss">
.el-dialog__body {
  padding: 0 20px !important;
}
.el-divider__text.is-left {
  left: 0;
  padding: 0;
  color: #aaaaaa;
}
</style>
