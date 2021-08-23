<template>
  <el-table :data="caseInfo"  :span-method="arraySpanMethod" border style="width: 100%">
    <el-table-column prop="loanPactNo" align="center" label="合同编号" width="180">
        <template slot-scope="scope">
            <template v-if="scope.$index === caseInfo.length-1 ">
                    合计剩余应还金额：{{caseStayRepayMoney}}
            </template>
            <template v-else>
                {{scope.row.loanPactNo}}
            </template>
        </template>
    </el-table-column>
    <el-table-column prop="loanPactAmount" align="center" label="合同金额" width="180">
    </el-table-column>
    <el-table-column prop="caseNo" align="center" label="案件ID">
    </el-table-column>
    <el-table-column prop="residueAmount" align="center" label="剩余应还金额/元">
    </el-table-column>
    <el-table-column prop="caseStatusText" align="center" label="案件状态">
    </el-table-column>
  </el-table>
</template>
<script>
export default {
  props:['caseInfo','caseStayRepayMoney'],
  data() {
    return {
    };
  },
  methods:{
      arraySpanMethod({ row, column, rowIndex, columnIndex }) {
        if (rowIndex === this.caseInfo.length-1) {
          if (columnIndex === 0) {
            return [1, 5];
          }
        }
      },
  }
};
</script>