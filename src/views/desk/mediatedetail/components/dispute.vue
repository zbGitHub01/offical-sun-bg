<template>
  <div>
    <template v-if="$route.params.mediateStatus < 4">
      <span>纠纷模板：</span>
      <el-select
        v-model="value"
        style="width: 300px"
        @change="handleChange"
        placeholder="请选择"
      >
        <el-option
          v-for="item in MdDisputelist.list"
          :key="item.id"
          :label="item.title"
          :value="item.id"
        >
        </el-option>
      </el-select>
      <div class="tinymce">
        <tinymce-comment v-model="content" ref="tinymce" />
      </div>
    </template>
    <template v-else>
      <span>纠纷模板：</span>
      <div class="tinymces" v-html="caseInfo.disputeMsg"></div>
    </template>
    <div style="margin-top: 20px">
      <el-button @click="onCopy">复制文案</el-button>
      <el-button
        class="link-copy"
        v-if="$route.params.mediateStatus < 4"
        type="text"
        @click="reset"
      >
        重置
      </el-button>
    </div>
  </div>
</template>
<script>
import TinymceComment from "@/components/Tinymce";
import {replace } from "@/utils/replace"
export default {
  components: { TinymceComment },
  props: ["MdDisputelist", "caseInfo"],
  watch: {
    caseInfo: {
      handler: function (val, oldVal) {
        if (val) {
          this.content =  val.disputeMsg
        }
      },
      immediate: true,
    },
  },
  data() {
    return {
      content: null,
      contentText: null,
      value: null,
    };
  },
  methods: {
    //重置
    reset() {
      this.MdDisputelist.list.map(item=>{
        if(item.id === this.value){
          this.content = replace(this.caseInfo,item.msg) ;
          this.$refs.tinymce.setContent(this.content);
        }
      })
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
    handleChange(value) {
      this.MdDisputelist.list.map((item) => {
        if (item.id === value) {
          this.content = replace(this.caseInfo,item.msg)
          this.$refs.tinymce.setContent(this.content);
        }
      });
    },
    //获取文本
    handleeditOk() {
      this.contentText = this.$refs.tinymce.getCopy();
      this.content = this.$refs.tinymce.getContent();
    },
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
</style>