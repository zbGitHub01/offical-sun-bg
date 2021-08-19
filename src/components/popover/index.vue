<template>
  <div>
    <el-popover
      placement="top-start"
      title="进度表"
      width="500"
      @show="handleShow"
      trigger="hover"
    >
      <el-table :data="webData" max-height="500">
        <el-table-column
          width="150"
          align="left"
          property="operationTime"
          label="操作时间"
        ></el-table-column>
        <el-table-column
          width="100"
          align="left"
          property="title"
          label="名称"
        ></el-table-column>
        <el-table-column
          width="100"
          align="left"
          property="schedule"
          label="进度"
        ></el-table-column>
        <el-table-column
          width="100"
          align="left"
          property="status"
          label="状态"
        >
          <template slot-scope="scope">
            <div v-if="scope.row.status !== null">
              <span style="color: #4b7902">{{ scope.row.status.desc }}</span>
              <template v-if="scope.row.status.type === 2">
                <span
                  style="color: #02a7f0; display: block; cursor: pointer"
                  @click="downloadFile(scope.row.url)"
                  >查看报告</span
                >
              </template>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <div slot="reference"><i class="el-icon-s-operation"></i></div>
    </el-popover>
    <el-dialog
      title="导入结果"
      :visible.sync="successShow"
      style="padding: 20px"
      width="20%"
    >
      <div class="warning_warp">
        <svg-icon icon-class="success" style="font-size: 40px" />
        <div>
          导入完成！
          <!-- <p >成功<span class="success">{{success}}</span>条数据 </p> -->
          <!-- <p >失败<span class="fail">{{fail}}</span>条数据 </p> -->
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="downloadFile">导出失败记录</el-button>
        <el-button type="primary" @click="successShow = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import websocket from "@/utils/websocket";
import { getDefaultId } from "@/utils/auth";
import { exportMethod } from "@/utils/export";
export default {
  name: "popover",
  data() {
    return {
      webData: [],
      successShow: false,
    };
  },
  methods: {
    handleShow() {
      let id = new Date().getTime();
      let params = {
        reqCode: 20102,
        msgUuid: id,
        data: getDefaultId(),
      };
      websocket.Send(params);
      websocket.Onmessage((ev) => {
        let data = JSON.parse(ev);
        if (data.msgCode === 20101) {
          let arr = [];
          data.data.map((item) => {
            if (item.$ref === undefined) {
              arr.push(item);
            }
          });
          this.webData = arr;
        }
      });
    },
    //查看导出记录
    handleCilck() {
      this.successShow = true;
    },
    //下载
    //点击下载
    downloadFile(item) {
      exportMethod(item);
    },
  },
};
</script>
<style scoped>
.el-icon-s-operation {
  padding-top: 13px;
  font-size: 24px;
  line-height: 1;
}
</style>