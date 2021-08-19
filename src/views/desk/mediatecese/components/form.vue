<template>
  <div>
    <el-form :inline="true" :model="formInline" class="demo-form-inline" label-width="130px">
      <el-form-item label="处置机构：" prop="organizeId">
        <el-select  clearable  v-model="formInline.organizeId"  filterable  placeholder="请选择处置机构">
          <el-option label="平台" :value="0"></el-option>
          <el-option
            v-for="item in selectdata.orgList "
            :key="item.itemId"
            :label="item.itemText"
            :value="item.itemId"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="调解员：" prop="mediatorByName">
        <el-select  clearable  v-model="formInline.mediatorByName"  filterable  placeholder="请选择调解员">
          <el-option
            v-for="item in selectdata.cpeList "
            :key="item.userId"
            :label="item.username"
            :value="item.userId"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="调解工单：" prop="inviteWorkNumber">
        <el-input  clearable v-model="formInline.inviteWorkNumber" placeholder="请输入调解工单" style="width: 200px"></el-input>
      </el-form-item>
      <el-form-item label="纠纷编号：" prop="disputeNumber">
        <el-input  clearable v-model="formInline.disputeNumber" placeholder="请输入纠纷编号" style="width: 200px"></el-input>
      </el-form-item>
     
      <el-form-item label="还款状态：" prop="repayType">
        <el-select  clearable  v-model="formInline.repayType" placeholder="请选择还款状态">
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
      <el-form-item label="分配状态：" prop="caseStatus">
        <el-select  clearable  v-model="formInline.caseStatus" placeholder="请选择调解状态">
          <el-option label="调解撤回" :value="1"></el-option>
          <el-option label="不受理" :value="2"></el-option>
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
  repayType: null,
  disputeNumber: null,
  inviteWorkNumber: null,
  mdCenterId: null,
  mediatorByName: null,
  organizeId: null,
  status: null,
  startCreateTime: null,
  endCreateTime:null,
  creditorsId:null
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
      this.$emit("allOrderList");
    },
    //查询
    onSubmit() {
      this.$emit("allOrderList");
    },
    
    change(val) {
      if(val===null){
        this.formInline.startCreateTime = null 
        this.formInline.endCreateTime = null
      }else{
        this.formInline.startCreateTime = val[0] 
        this.formInline.endCreateTime = val[1] 
      }
    }
  }
};
</script>
