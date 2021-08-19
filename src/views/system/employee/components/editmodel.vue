<template>
  <div class="user_warp">
    <el-form
    ref="form"
    :model="form"
    label-width="120px"
    :rules="rules"
    :validate-on-rule-change="false"
  >
    <el-card class="box-card" shadow="never" bordered="false">
      <div class="text item">个人信息</div>
      <div class="text item">
        <div>
          <el-upload
            class="avatar-uploader"
            action="/other/file/upload"
            :headers="tokens"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
          >
            <img
              style="width: 150px; height: 150px"
              v-if="form.avatar"
              :src="form.avatar"
              class="avatar"
            />
            <div style="width: 150px; height: 150px; padding-top: 40px" v-else>
              <i class="el-icon-camera-solid"></i>
              <p>点击上传头像</p>
            </div>
          </el-upload>
        </div>
        <div>
          <el-form-item label="姓名：" prop="username">
            <el-input
              v-model="form.username"
              placeholder="请输入姓名"
            ></el-input>
          </el-form-item>
          <el-form-item label="性别：" prop="sex">
            <el-select  clearable  v-model="form.sex" placeholder="请选择性别">
              <el-option
                v-for="item in sexoptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="身份证号：" prop="idNumber">
            <el-input
              v-model="form.idNumber"
              placeholder="请输入身份证号"
            ></el-input>
          </el-form-item>
        </div>
      </div>
      <div class="text item">
        <div>
          <span class="id_img">身份证正面照：</span>
          <el-upload
            class="avatar-uploader"
            action="/other/file/upload"
            :show-file-list="false"
            :headers="tokens"
            :on-success="handleAvatarIdFSuccess"
          >
            <img
              style="width: 150px; height: 150px"
              v-if="form.idFront"
              :src="form.idFront"
              class="avatar"
            />
            <div v-else style="width: 150px; height: 150px; padding-top: 40px">
              <i class="el-icon-camera-solid"></i>
              <p>点击上传</p>
            </div>
          </el-upload>
        </div>
        <div>
          <span class="id_img">身份证反面照：</span>
          <el-upload
            class="avatar-uploader"
            action="/other/file/upload"
            :headers="tokens"
            :show-file-list="false"
            :on-success="handleAvatarIdBSuccess"
          >
            <img
              style="width: 150px; height: 150px"
              v-if="form.idBack"
              :src="form.idBack"
              class="avatar"
            />
            <div style="width: 150px; height: 150px; padding-top: 40px" v-else>
              <i class="el-icon-camera-solid"></i>
              <p>点击上传</p>
            </div>
          </el-upload>
        </div>
      </div>
    </el-card>
    <el-card class="box-card" shadow="never" bordered="false">
      <div class="text item">入职信息</div>
      <div class="text item">
        <div>
          
          <el-form-item prop="joinTime" label="入职时间：">
            <el-date-picker
              v-model="form.joinTime"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="选择入职日期"
              style="width: 100%"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="入职机构：" prop="orgId">
            <el-select  clearable  v-model="form.orgId" filterable  placeholder="请选择入职机构">
              <el-option
                v-for="item in orgList"
                :key="item.itemId"
                :label="item.itemText"
                :value="item.itemId"
              ></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div>
          <el-form-item label="工号：" prop="jobNumber">
            <el-input
              v-model="form.jobNumber"
              placeholder="请输入工号"
            ></el-input>
          </el-form-item>
          
          <el-form-item label="角色权限：" prop="roleId">
            <el-select  clearable  v-model="form.roleId" placeholder="请选择角色权限">
              <el-option
                v-for="item in roleList"
                :key="item.roleId"
                :label="item.roleName"
                :value="item.roleId"
              ></el-option>
            </el-select>
          </el-form-item>
        </div>
      </div>
    </el-card>
    <el-card class="box-card" shadow="never" bordered="false">
      <div class="text item">账号信息</div>
      <div class="text item">
        <div>
          <el-form-item label="手机号：" prop="userPhone">
            <el-input
              v-model="form.userPhone"
              placeholder="请输入手机号"
            ></el-input>
          </el-form-item>

          <el-form-item label="钉钉账号：" prop="dingName">
            <el-input
              v-model="form.dingName"
              placeholder="请输入钉钉账号"
              :disabled="true"
            ></el-input>
          </el-form-item>
        </div>
        <!-- <div>
          <el-form-item
            label="密码："
            prop="password"
            v-if="pswEditVisiable "
          >
            <el-input
              v-model="form.password"
              @change="getPassword"
              type="password"
              placeholder="请输入密码"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="密码："
            prop="password"
            v-else
          >
            <span>******</span>
            <el-button
              style="margin-left: 20px; color: #48a0ff"
              type="text"
              size="default"
              @click="handleChangePsw"
              >修改</el-button
            >
          </el-form-item>
        </div> -->
      </div>
    </el-card>
  </el-form>
  <el-dialog title="提示" :visible.sync="Show" append-to-body style="padding:20px" width="25%">
       <div class="warning_warp">
        <svg-icon icon-class="backwarning" style="font-size:40px" />
        <div>
          {{type === 1 ? '手机号' : type === 2 ? '身份证号' : '与在库案人'  }}重复，是否继续创建？
          <p>{{title}}</p>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
          <el-button @click="skip">跳过</el-button>
          <el-button type="primary" @click="handlerOk">继 续</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
const defaultForm = {
  avatar: null,
  idBack: null,
  idFront: null,
  idNumber: null,
  jobNumber: null,
  joinTime: null,
  roleId: null,
  sex: null,
  userPhone: null,
  username: null,
  state:0
};
import { usersave } from "@/api/mediateuser";
import { getToken } from "@/utils/auth";
const token = getToken();
export default {
  props: [  "roleList" , "orgList", "positionList"],
  data() {
    return {
      pswEditVisiable: false,
      disabled:true,
      optionProps: {
        checkStrictly: true,
        value: "departmentId",
        label: "departmentName",
        children: "children",
      },
      tokens: {
        Authorization: token,
      },
      sexoptions: [
        {
          value: 1,
          label: "男",
        },
        {
          value: 0,
          label: "女",
        },
      ],
      form: Object.assign({}, defaultForm),
      rules: {
        username: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        sex: [{ required: true, message: "请选择性别", trigger: "change" }],
        userPhone: [
          { required: true, message: "请输入手机号", trigger: "blur" },
        ],
        joinTime: [
          {
            required: true,
            message: "请选择日期",
            trigger: "change",
          },
        ],
        roleId: [
          { required: true, message: "请选择角色权限", trigger: "change" },
        ],
        idNumber: [
          { required: true, message: "请输入身份证", trigger: "blur" },
        ],
        departmentId:[
          { required: true, message: "请选择部门", trigger: "change" },
        ],
        orgId:[
          { required: true, message: "请选择机构", trigger: "change" },
        ]
        
        // password: [
        //   {
        //     required: true,
        //     message: "请输入修改密码",
        //     trigger: "change"
        //   }
        // ],
      },
      Show:false,
      type:0,
      title:''
    };
  },
  methods: {
    //获取头像
    handleAvatarSuccess(res, file) {
      this.form.avatar = res.data.fileUrl;
    },
    //身份证正面
    handleAvatarIdFSuccess(res, file) {
      this.form.idFront = res.data.fileUrl;
    },
    //身份证背面
    handleAvatarIdBSuccess(res, file) {
      this.form.idBack = res.data.fileUrl;
    },
    //修改密码
    handleChangePsw() {
      this.pswEditVisiable = !this.pswEditVisiable;
    },
    //获取密码
    getPassword(val) {
      this.form["password"] = val;
    },
    //确认在此次写便于复用
    handlerOk() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          let params = Object.assign({},this.form)
          params['state'] = this.type
          usersave(params).then((res) => {
            if (res.code === 200) {
              this.$message.success(res.msg);
              this.Show = false
              this.$refs.form.resetFields();
              this.$emit("getuser");
              this.$emit("close");
            }else if(res.code === 1001 || res.code === 1002 || res.code === 1003){
              this.type = res.code === 1001 ? 1 : res.code === 1002 ? 2 : 3
              this.title = res.msg
              this.Show = true
            }
          });
        } else {
          return false;
        }
      });
    },
    //跳过
    skip(){
      this.Show = false 
      this.$refs.form.resetFields();
      this.$emit("getuser");
      this.$emit("close");
    },
    //清空数据
    hanclear() {
      this.form = Object.assign({}, defaultForm);
      this.$refs.form.resetFields();
      this.pswEditVisiable = false;
    },
  },
};
</script>
<style lang="scss" scoped>
.user_warp{
  .el-dialog__body {
  padding: 0 !important;
}
.el-dialog {
  margin: 5vh auto !important;
}
.text {
  font-size: 14px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .id_img {
    display: block;
    margin-bottom: 10px;
  }
}
.box-card {
  width: 96%;
  margin: 0 auto;
  border: none;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  -align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.el-icon-camera-solid {
  font-size: 30px;
}
}
.warning_warp {
  display: flex;
  padding: 20px;
  div {
    font-size: 16px;
    display: inline-block;
    padding: 10px;
    margin-left: 10px;
    span{
      display: inline-block;
      margin: 0 5px;
      font-size: 20px;
    }
    .fail{
      color: red;
    }
    .success{
      color: green;
    }
  }
}
</style>