<template>
  <div>
    <el-select
      v-model="mediateOrganizeId"
      style="width: 300px"
      placeholder="请选择"
    >
      <el-option
        v-for="item in orgList"
        :key="item.id"
        :label="item.mdCenterName"
        :value="item.id"
      >
      </el-option>
    </el-select>
    <h4>代理人/ODR账号：</h4>
    <el-select
      v-model="agentId"
      style="width: 300px"
      @change="handlechange"
      placeholder="请选择"
    >
      <el-option
        v-for="item in agentList"
        :key="item.id"
        :label="item.name"
        :value="item.id"
      >
      </el-option>
    </el-select>
    <div>
      <el-input
        style="margin-top: 20px; width: 300px"
        v-model="agentAccount"
        placeholder="代理人ODR账号"
      ></el-input>
    </div>
    <div>
      <el-input
        style="margin-top: 20px; width: 300px"
        v-model="agentPassword"
        placeholder="代理人ODR密码"
      ></el-input>
    </div>
    <el-button style="margin-top: 20px" type="primary" @click="handleOk"
      >提交调解申请</el-button
    >
  </div>
</template>
<script>
export default {
  props: ["caseInfo", "agentList", "orgList", "agentInfo"],
  data() {
    return {
      mediateOrganizeId: null,
      agentId: this.agentInfo.id,
      agentAccount: this.agentInfo.agentAccount,
      agentPassword: this.agentInfo.agentPassword,
    };
  },
  watch: {
    orgList: {
      handler: function (val) {
        if (val) {
          this.mediateOrganizeId =
            this.caseInfo.mediateOrganizeId === null
              ? val[0].id
              : this.caseInfo.mediateOrganizeId;
        }
      },
      immediate: true,
    },
  },
  methods: {
    //调解申请
    handleOk() {
      let params = {
        agentAccount: this.agentAccount,
        agentPassword: this.agentPassword,
        agentId: this.agentId,
        mediateOrganizeId: this.mediateOrganizeId,
      };
      this.$emit("handleOk", params);
    },
    handlechange(item) {
      this.agentList.map((items) => {
        if (item === items.id) {
          this.$emit("handleChange", items);
        }
      });
    },
  },
};
</script>