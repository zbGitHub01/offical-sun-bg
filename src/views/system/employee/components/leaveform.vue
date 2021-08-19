<template>
  <div>
    <el-form :inline="true" :model="formInline" class="demo-form-inline" label-width="120px">
      <el-form-item label="所属机构：" prop="orgId">
        <el-select  clearable  v-model="formInline.orgId" filterable  placeholder="请选择所属机构">
            <el-option
              v-for="item in orgList "
              :key="item.itemId"
              :label="item.itemText"
              :value="item.itemId"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="姓名：" prop="username">
        <el-input  clearable v-model="formInline.username" placeholder="请输入姓名" style="width: 200px"></el-input>
      </el-form-item>
      <el-form-item label="手机号：" prop="userPhone">
        <el-input  clearable v-model="formInline.userPhone" placeholder="请输入手机号" style="width: 200px"></el-input>
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
  orgId: null,
  userPhone: null,
  username: null
};
export default {
  props: ["orgList"],
  data() {
    return {
      formInline: Object.assign({}, defalutSearchParams)
    };
  },
  methods: {
    //清空
    cancal() {
      this.formInline = Object.assign({}, defalutSearchParams);
      this.$emit('getuser');
    },
    //查询
    onSubmit() {
      this.$emit('getuser');
    }
  }
};
</script>
