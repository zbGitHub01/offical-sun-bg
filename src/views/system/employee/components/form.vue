<template>
  <div>
    <el-form :inline="true" :model="formInline" class="demo-form-inline" label-width="120px">
      <el-form-item label="姓名：" prop="username">
        <el-input  clearable v-model="formInline.username" placeholder="请输入姓名" style="width: 200px"></el-input>
      </el-form-item>
      <el-form-item label="账号状态：" prop="userStatus">
        <el-select  clearable  v-model="formInline.userStatus" placeholder="请选择账号状态">
          <el-option label="已启用" :value="1"></el-option>
          <el-option label="已停用" :value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="手机号：" prop="userPhone">
        <el-input  clearable v-model="formInline.userPhone" placeholder="请输入手机号" style="width: 200px"></el-input>
      </el-form-item>
       <el-form-item label="调解机构:"  prop="orgId">
            <el-select  clearable  v-model="formInline.orgId" filterable  placeholder="请选择所属机构">
              <el-option
                v-for="item in orgList "
                :key="item.itemId"
                :label="item.itemText"
                :value="item.itemId"
              ></el-option>
            </el-select>
          </el-form-item>
      <el-form-item prop="joinData" label="入职日期：">
        <el-date-picker
          v-model="joinData"
          type="daterange"
          value-format="yyyy-MM-dd"
          format="MM-dd"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          style="width: 200px"
          @change="change"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="角色权限：" prop="roleId">
        <el-select  clearable  v-model="formInline.roleId" placeholder="请选择角色权限">
          <el-option
            v-for="item in roleList"
            :key="item.roleId"
            :label="item.roleName"
            :value="item.roleId"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="钉钉绑定：" prop="isDing">
        <el-select  clearable  v-model="formInline.isDing" placeholder="请选择钉钉绑定状态">
          <el-option label="是" value="1"></el-option>
          <el-option label="否" value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item >
        <el-button type="default" @click="cancal">清空</el-button>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
const defalutSearchParams = {
  orgId: null,
  isDing: null,
  joinTimeEnd: null,
  joinTimeStart: null,
  positionStatus: null,
  roleId: null,
  userPhone: null,
  userStatus: null,
  username: null
};
export default {
  props: [ "roleList" , "orgList"],
  data() {
    return {
      joinData: [],
      formInline: Object.assign({}, defalutSearchParams)
    };
  },
  methods: {
    change(val) {
       if(val===null){
        this.formInline.joinTimeStart = null 
        this.formInline.joinTimeEnd = null
      }else{
        this.formInline.joinTimeStart = val[0] 
        this.formInline.joinTimeEnd = val[1] 
      }
    },
    //清空
    cancal() {
      this.formInline = Object.assign({}, defalutSearchParams);
      this.joinData = []
      this.$emit('getuser');
    },
    //查询
    onSubmit() {
      this.$emit('getuser');
    }
  }
};
</script>
