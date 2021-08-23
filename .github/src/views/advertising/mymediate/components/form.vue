<template>
  <div>
    <el-form :inline="true" :model="formInline" class="demo-form-inline" label-width="130px">
      <el-form-item label="处置机构：" prop="orgId">
        <el-select  clearable  v-model="formInline.orgId"  filterable  placeholder="请选择处置机构">
          <el-option
            v-for="item in selectdata.orgList "
            :key="item.itemId"
            :label="item.itemText"
            :value="item.itemId"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="调解工单：" prop="userName">
        <el-input  clearable v-model="formInline.userName" placeholder="请输入调解工单" style="width: 200px"></el-input>
      </el-form-item>
      <el-form-item label="纠纷编号：" prop="idno">
        <el-input  clearable v-model="formInline.idno" placeholder="请输入纠纷编号" style="width: 200px"></el-input>
      </el-form-item>

      <el-form-item label="还款状态：" prop="refundStatus">
        <el-select  clearable  v-model="formInline.refundStatus" placeholder="请选择还款状态">
          <el-option label="全部" :value="0"></el-option>
          <el-option label="未还款" :value="1"></el-option>
          <el-option label="部分还款" :value="2"></el-option>
          <el-option label="已结清" :value="3"></el-option>
          <el-option label="未还清" :value="4"></el-option>
        </el-select>
      </el-form-item>
        <el-form-item label="创建时间：" prop="date">
        <el-date-picker
          v-model="date"
          type="daterange"
          value-format="yyyy-MM-dd"
          format="MM-dd"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          @change="change"
          style="width: 200px"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="调解状态：" prop="caseStatus">
      <el-select  clearable  v-model="formInline.caseStatus" placeholder="请选择调解状态">
          <el-option label="待审批" :value="0"></el-option>
          <el-option label="已失效" :value="1"></el-option>
          <el-option label="审批拒绝" :value="2"></el-option>
          <el-option label="审批通过/待提交" :value="3"></el-option>
          <el-option label="待进入调解" :value="4"></el-option>
          <!-- <el-option label="待提交" :value="4"></el-option> -->
          <el-option label="待调解" :value="11"></el-option>
          <el-option label="正在调解" :value="12"></el-option>
          <el-option label="调解成功" :value="13"></el-option>
          <el-option label="调解撤回" :value="14"></el-option>
          <el-option label="不受理" :value="15"></el-option>
          <el-option label="调解失败" :value="16"></el-option>
        </el-select>
      </el-form-item>
        <el-form-item>
          <el-button type="default" @click="cancal">清空</el-button>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
    </el-form>
  </div>
</template>

<script>
const defalutSearchParams = {
  caseNo: null,
  productId: null,
  batchId: null,
  userName: null,
  idno: null,
  userPhone: null,
  regAddrProvince: null,
  regAddrCity: null,
  regAddrArea: null,
  refundStatus: null,
  caseStatus: null,
  refundStatus: null,
  isRetain: null,
  tagTempName: null,
  tagAlterName: null,
  ivrTag: null,
  robotTag: null,
  creditorId: null,
  entrustStatus: null,
  joinTimeStart: null
};
export default {
  props: ["selectdata"],
  data() {
    return {
      optionsProps: {
        value: "name",
        checkStrictly: true,
        label: "name",
        children: "children"
      },
      adress: [],
      date: [],
      formInline: Object.assign({}, defalutSearchParams)
    };
  },
  methods: {
    //清空
    cancal() {
      this.formInline = Object.assign({}, defalutSearchParams);
      this.date = [];
      this.adress = [];
      this.$emit("queryMyOrgMdOrder");
    },
    //级联事件
    slechange(val) {
      this.formInline.regAddrProvince = val[0];
      this.formInline.regAddrCity = val[1];
      this.formInline.regAddrArea = val[2];
    },
    //查询
    onSubmit() {
      this.$emit("queryMyOrgMdOrder");
    },
    
    change(val) {
      if(val===null){
        this.formInline.joinTimeStart = null 
        this.formInline.joinTimeEnd = null
      }else{
        this.formInline.joinTimeStart = val[0] 
        this.formInline.joinTimeEnd = val[1] 
      }
    }
  }
};
</script>
