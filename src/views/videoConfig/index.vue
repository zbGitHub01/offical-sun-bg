<template>
  <div class="app-container message-container banner-wrap">
    <div class="style-container mb20">
      <div v-for="(item,index) in searchCondition">
        <div class="item_warp"
             :key="index"
             @click="handleClick(item.prop)">
          <div class="img_warp">
            <svg-icon :icon-class="item.icon" />
          </div>
          <div class="title_warp">{{item.title}}</div>
        </div>
      </div>
    </div>
    <el-form :model="form.data"
             :rules="form.rules"
             label-width="150px"
             label-position="left"
             ref="form">
      <el-form-item label="PC视频封面图片"
                    prop="picture">
        <div class="upload-wrap">
          <div v-if="form.picture">
            <el-image :src="form.picture"
                      :preview-src-list="[form.picture]"
                      class="picture-img">
            </el-image>
            <div style="color: red">(注：当前显示的为实际应用在网页上的效果，请确认您上传的图片尺寸符合您的要求)</div>
          </div>
          <span class="nullText" v-else>暂无</span>
        </div>
        <!-- <div class="editBtn">
          <el-button type="error" v-if="form.picture" @click="handleDel('picture')">删除</el-button>
        </div> -->
      </el-form-item>
      <el-form-item label="H5视频封面图片"
                    prop="phonePicture">
        <div class="upload-wrap">
          <div v-if="form.phonePicture">
            <el-image :src="form.phonePicture"
                      :preview-src-list="[form.phonePicture]"
                      class="phonePicture-img">
            </el-image>
            <div style="color: red">(注：当前显示的为实际应用在网页上的效果，请确认您上传的图片尺寸符合您的要求)</div>
          </div>
        
          <span class="nullText" v-else>暂无</span>
        </div>
        <!-- <div class="editBtn">
          <el-button type="error" v-if="form.phonePicture" @click="handleDel('phonePicture')">删除</el-button>
        </div> -->
      </el-form-item>
      <el-form-item label="首页宣传视频"
                    prop="videoUrl">
        <div class="upload-wrap">
          <video v-if="form.videoUrl"
                 controls
                 height="180px"
                 :src="form.videoUrl"
                 preload="auto"
                 class="upload-img">
          </video>
          <span class="nullText" v-else>暂无</span>
        </div>
        <!-- <div class="editBtn">
          <el-button type="error" v-if="form.videoUrl" @click="handleDel('videoUrl')">删除</el-button>
        </div> -->
      </el-form-item>
    </el-form>
    <form-dialog ref="formDialog"
                 @getTableData="getDataList"></form-dialog>
  </div>
</template>

<script>
import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import { getToken, removeToken, removeRole } from "@/utils/auth";
import Pagination from "@/components/Pagination";
import FormDialog from './formDialog.vue';
export default {
  name: 'index',
  components: { Pagination, FormDialog },
  data () {
    return {
      form: {
        picture: '',
        phonePicture: '',
        videoUrl: '',
      },
      searchCondition: [
        {
          title: "配置视频及封面图",
          icon: "edit",
          prop: 'edit'
        },
        {
          title: "全部删除",
          icon: "dellabel",
          prop: 'delete'
        },
      ],
      isHaveData: false, // 判断有无数据的标识
    }
  },
  created () {
    this.getDataList();
  },
  methods: {
    // 获取数据
    getDataList () {
      const params = {
        page: 1,
        pageSize: 10,
        CId: '12'
      }
      this.$api.findPageAdvantage(params).then(res => {
        if (res.isError) return this.$message.error(res.msg)
        const dataArr = res.data.data;
        if (dataArr.length < 1) return;
        this.form = Object.assign(this.form,dataArr[0]); // 肯定只有一条数据
        this.isHaveData = true; // 标识为有数据
        console.log('现在表单数据',this.form)
      })
    },
    handleDel () {
      this.$confirm('确定全部删除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$api.deleteAdvantage({ id }).then(res => {
          if (res.isError) return this.$message.error(res.msg)
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.getDataList()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });          
      });
    },
    handleClick (prop) {
      prop === 'delete'? this.handleDel() : this.$refs.formDialog.show(this.isHaveData,this.form)  // 判断新增还是编辑 isHaveData true：有；反之无
    },
    // 新增、编辑
    onAdvantage (type, data) {
      if (type === 'delete') return this.onSelectedDelete()
      this.$refs.formDialog.show(type, data)
    }
  }
}
</script>

<style lang='scss' scoped>
.banner-wrap {
  flex-direction: column;
}
.mb20 {
  margin-bottom: 50px !important;
}
.picture-img {
  width: 860px;
  height: 300px;
}
.phonePicture-img {
  width: 375px;
  height: 440px;
}
.upload-wrap {
  video {
    width: 400px;
  }
}

.nullText {
  display: inline-block;
  width: 200px;
  color: #1989fa;
  font-weight: bold;
  text-align: center;
}
form {
  margin-bottom: 100px;
}
.editBtn {
  margin-left: 50px;
}
::v-deep .el-form-item__content {
  display: flex;
  align-items: center;
}
.style-container {
  border: none;
  margin: 0;
  box-shadow: 0px 0px 0px 0px rgb(0 0 0);
  flex-direction: row;
  .item_warp {
    margin: 0 10px 0 0;
    .img_warp {
      line-height: 20px;
      svg {
        color: #ffffff;
      }
    }
  }
}
</style>