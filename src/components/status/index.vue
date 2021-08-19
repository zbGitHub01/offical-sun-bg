<template>
  <div>
    <template v-if="row.caseStatus === 1">
      <router-link :to="'/case/detail/'+row.caseId+'/'+row.productId" >
        <a style="color: rgb(2, 167, 240)">{{ row.caseNo }}</a>
      </router-link>
    </template>
    <template v-else>
      <a style="color: rgb(2, 167, 240)" @click="handlClick">{{ row.caseNo }}</a>
    </template>
    <span v-if="row.retainId !== 0">
      <el-tooltip
        class="item"
        effect="dark"
        :content="`留案至${row.retainEndTime}`"
        placement="top-start"
      >
        <span class="item">留</span>
      </el-tooltip>
    </span>
    <span v-if="row.pauseCaseType.length !== 0">
      <el-tooltip
        class="item"
        effect="dark"
        :content="
          row.pauseCaseType[0].pauseType === 2
            ? '永久停催'
            : `停催至${row.pauseCaseType[0].expire}`
        "
        placement="top-start"
      >
        <span class="item item2">停</span>
      </el-tooltip>
    </span>
    <!-- <span
      v-if="row.certUrl !== '' && row.certUrl !== null"
      class="item item3"
      @click="handleClick(row)"
      >清</span> -->
  </div>
</template> 
<script>
export default {
  props: ["row"],
  methods: {
    //查看结清证明
    // handleClick(item) {
    //   let url = item.certUrl;
    //   window.open(url);
    // },
    //提示
    handlClick(){
      this.$message.warning('非正常案件状态，不可查看')
    }
  },
};
</script>