<template>
  <div class="app-container password-warp">
    <el-form
      ref="ruleForm"
      :model="ruleForm"
      status-icon
      :rules="rules"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="原密码:" prop="oldPassword">
        <el-input  clearable v-model="ruleForm.oldPassword" type="password"  />
      </el-form-item>
      <el-form-item label="新密码:" prop="newPassword">
        <el-input  clearable v-model="ruleForm.newPassword" type="password"  />
      </el-form-item>
      <el-form-item label="确认密码:" prop="checkPass">
        <el-input  clearable v-model="ruleForm.checkPass" type="password"  />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {editPaw } from "@/api/user";

export default {
  name: "Profile",
  data() {
    return {
      ruleForm: {
        oldPassword: "",
        newPassword: "",
        checkPass: ""
      },
      rules: {
        oldPassword: [
          { required: true, message: "密码不能为空", trigger: "blur" }
        ],
        newPassword: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          {
            pattern: /^(?![a-zA-Z]+$)(?![A-Z0-9]+$)(?![A-Z\W_]+$)(?![a-z0-9]+$)(?![a-z\W_]+$)(?![0-9\W_]+$)[a-zA-Z0-9\W_]{8,20}$/,
            message:
              "密码为数字，小写字母，大写字母，特殊符号 至少包含三种，且长度为8到20位",
            trigger: "blur"
          }
        ],
        checkPass: [
          { required: true, message: "密码不能为空", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if(this.ruleForm.newPassword != this.ruleForm.checkPass){
            this.editformValidate.checkPass = ''
            this.$Message.warning('两次密码输入不一致，请重新输入!')
          }else{
            let params={
              newPassword:this.ruleForm.newPassword,
              oldPassword:this.ruleForm.oldPassword
            }
            editPaw(params).then(res=>{
                if(res.code===200){
                  this.$message.success(res.msg)
                }
            })
          }
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style lang="scss" scoped>
.password-warp {
  margin: 50px 32px;
  height: 100%;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
</style>
