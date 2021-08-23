<template>
  <div>
    <p style="color:#ccc">调解方案 </p>
    <span class="defalut_width">调解方案模板：</span>
    <el-select v-model="value" :disabled='$route.params.mediateStatus < 4?false:true' style="width:300px" @change="handleChange" placeholder="请选择调解方案模板">
       <el-option
        v-for="item in MdSchemelist.list"
        :key="item.id"
        :label="item.title"
        :value="item.id"
      >
      </el-option>
    </el-select>
    <p></p>
    <div>
      <span class='defalut_width'>还款总额：</span>
     <el-input :disabled='$route.params.mediateStatus < 4?false:true' v-model="value1" style="width: 300px" type="number" @input='input' placeholder="请输入还款总额" />
      <p class="defalut_color">支持修改金额，不能小于 <span style="color:red">{{caseInfo.caseStayRepayMoney}}</span> 元</p>
    </div>
    <template v-if="type === '1'">
      <div>
      <span class="defalut_width">还款期数：</span>
     <el-input :disabled='$route.params.mediateStatus < 4?false:true' v-model="value2" type="number" style="width: 300px" @input='input1' placeholder="请输入还款期数" />
      <p class="defalut_color">最少分期不得小于2期</p>
    </div>
    <div>
      <span class="defalut_width">首期还款日：</span>
      <el-date-picker
      :disabled='$route.params.mediateStatus < 4?false:true'
      v-model="value3"
      @change="handleGetDate"
      value-format="yyyy-MM-dd"
      type="date"
      placeholder="选择首期还款日">
    </el-date-picker>
      <p class="defalut_color">首期还款日请在未来30天内进行选择</p>
    </div>
    </template>
    <template v-if="type === '0'">
  <div>
      <span class="defalut_width">约定还款日：</span>
      <el-date-picker
      v-model="value4"
      @change="handleGetDate1"
      value-format="yyyy-MM-dd"
      type="date"
      placeholder="选择约定还款日">
    </el-date-picker>
      <p class="defalut_color">约定还款日请在未来30天内进行选择</p>
    </div>
    </template>
    <template v-if="$route.params.mediateStatus < 4">
      <div class="tinymce">
      <tinymce-comment v-model="content" ref="tinymce" />
    </div>
    </template>
    <template v-else> 
      <div class="tinymces" v-html="caseInfo.mediateMsg">
      </div>
    </template>
    <div style="margin-top: 20px">
      <el-button @click="onCopy">复制文案</el-button>
      <el-button v-if="$route.params.mediateStatus < 4" class="link-copy"  type="text" @click="reset"> 重置 </el-button>
    </div>
  </div>
</template>
<script>
import TinymceComment from "@/components/Tinymce";
import {queryPeriod} from "@/api/mediatedetail"
import {replacemed } from "@/utils/replace"
export default {
  components: { TinymceComment },
  props:['MdSchemelist','caseInfo'],
  watch: {
    caseInfo: {
      handler: function (val) {
        if(val){
          this.content =val.mediateMsg
        }
      },
      immediate: true,
    },
  },
  data() {
    return {
      content: null,
      contentText:null,
      type:null,
      value: null,
      value1:null,
      value2:null,
      value3:null,
      value4:null,
      item:`<span id="debt_surplus_repay_moeny" style="color: #5488f9;">${this.caseInfo.caseStayRepayMoney}</span>`,
      item1:`<span id="repayment_periods" style="color: #5488f9;">${this.caseInfo.repayPeriods}</span>`,
      item2:`<span id="deadline" style="color: #5488f9;">${this.caseInfo.repayTime}</span>`,
      item3:`<span id="period_limit" style="color: #5488f9;">200</span>`,
      item4:`<span id="repay_date" style="color: #5488f9;">15</span>`,
      item5:`<span id="appoint_repay_date" style="color: #5488f9;">${this.caseInfo.repayTime}</span>`
    };
  },
  methods: {
    //复制文案
    handlecopy() {},
    //重置
    reset() {
      this.MdSchemelist.list.map(item=>{
        if(item.id === this.value){
          this.content = replacemed(this.caseInfo,item.msg) ;
          this.$refs.tinymce.setContent(this.content);
        }
      })
    },
     //输入
    input(value){
      let val = this.content.replace(new RegExp(this.item,'gm'),`<span id="debt_surplus_repay_moeny" style="color: #5488f9;">${value}</span>`)
      this.item = `<span id="debt_surplus_repay_moeny" style="color: #5488f9;">${value}</span>`
      this.$refs.tinymce.setContent(val);
    },
    //输入
    input1(value){
      let val = this.content.replace(new RegExp(this.item1,'gm'),`<span id="repayment_periods" style="color: #5488f9;">${value}</span>`)
      this.item1 = `<span id="repayment_periods" style="color: #5488f9;">${value}</span>`
      this.$refs.tinymce.setContent(val);
    },
    //输入
    handleGetDate(value){
      let params = {
          money:this.value1 || this.caseInfo.caseStayRepayMoney,
          period:this.value2 || 6,
          periodTime:value,
      }
      queryPeriod(params).then(res=>{
          if(res.code === 200){
          let obj = JSON.parse(res.data)[JSON.parse(res.data).length-1]
          let val = this.content.replace(new RegExp(this.item2,'gm'),`<span id="deadline" style="color: #5488f9;">${obj.periodTime}</span>`)
          this.$refs.tinymce.setContent(val);
          this.item2 = `<span id="deadline" style="color: #5488f9;">${obj.periodTime}</span>`
          let vals = this.content.replace(new RegExp(this.item3,'gm'),`<span id="period_limit" style="color: #5488f9;">${obj.periodMoney}</span>`)
          this.$refs.tinymce.setContent(vals);
          this.item3 = `<span id="period_limit" style="color: #5488f9;">${obj.periodMoney}</span>`
          let objs = obj.periodTime.split("-")[obj.periodTime.split("-").length-1]
          let valst = this.content.replace(new RegExp(this.item4,'gm'),`<span id="repay_date" style="color: #5488f9;">${objs}</span>`)
          this.$refs.tinymce.setContent(valst);
          this.item4 = `<span id="repay_date" style="color: #5488f9;">${objs}</span>`
        }
      })
    },
    handleGetDate1(value){
      let valst = this.content.replace(new RegExp(this.item5,'gm'),`<span id="repay_date" style="color: #5488f9;">${value}</span>`)
      this.$refs.tinymce.setContent(valst);
      this.item5 = `<span id="repay_date" style="color: #5488f9;">${value}</span>`
    },
    //复制成功
    onCopy() {
      let createInput = document.createElement("input");
      createInput.value = this.$refs.tinymce.getCopy();
      document.body.appendChild(createInput);
      createInput.select(); // 选择对象
      document.execCommand("Copy"); // 执行浏览器复制命令
      createInput.style.display = "none";
      this.$message({ message: "复制成功", type: "success" });
    },
     //切换传模板
    handleChange(value){
      this.value1 = null,
      this.value2 = null,
      this.value3 = null,
      this.value4 = null,
      this.MdSchemelist.list.map(item=>{
        if(item.id===value){
          this.type = item.type
          this.content = replacemed(this.caseInfo,item.msg)
          this.$refs.tinymce.setContent(this.content);
          this.item=`<span id="debt_surplus_repay_moeny" style="color: #5488f9;">${this.caseInfo.caseStayRepayMoney}</span>`,
          this.item1='<span id="repayment_periods" style="color: #5488f9;">6</span>',
          this.item2='<span id="deadline" style="color: #5488f9;">2021年10月28日</span>',
          this.item3='<span id="period_limit" style="color: #5488f9;">200</span>',
          this.item4='<span id="repay_date" style="color: #5488f9;">15</span>',
          this.item5=`<span id="appoint_repay_date" style="color: #5488f9;">2021年10月28日</span>`
        }
      })
    },
    //获取文本
    handleeditOk(){
      this.contentText = this.$refs.tinymce.getCopy();
      this.content = this.$refs.tinymce.getContent();
    }
  },
};
</script>
<style lang="scss" scoped>
.tinymce {
  width: 100%;
  margin-top: 20px;
}
.tinymces {
  width: 100%;
  border: 1px solid #ccc;
  padding: 20px;
  margin-top: 20px;
}
.defalut_width{
  display: inline-block;
  width: 120px;
}
.defalut_color{
  font-size: 14px;
  color: #FF9921;
  margin-left: 120px;
}
</style>