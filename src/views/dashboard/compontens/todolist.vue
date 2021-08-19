<template>
  <div class="app-container message-container">
    <div class="message-warp todolist-warp padding-16">
      <div class="title">待办事项</div>
      <div class="calendar">
        <div class="calendar_even">
          <el-calendar v-model="value" id="calendar">
            <template slot="dateCell" slot-scope="{date, data}">
                <div v-for="(item,index) in calendarData" :key='index'>
                  <div
                    v-if="(item.remindDate.split('-').slice(1)[0]).indexOf(data.day.split('-').slice(1)[0])!=-1">
                    <div
                      v-if="(item.remindDate.split('-').slice(2).join('-')).indexOf(data.day.split('-').slice(2).join('-'))!=-1"
                    >
                      <el-tooltip
                        class="item"
                        effect="dark"
                        :content="item.backlogCount"
                        placement="right"
                      >
                        <div class="is-selected">{{item.backlogCount}}</div>
                      </el-tooltip>
                    </div>
                    <div v-else></div>
                  </div>
                  <div v-else></div>
                </div>
                <div
                  class="calendar-day"
                  @click="handleClick(data)"
                >{{ data.day.split('-').slice(2).join('-') }}</div>
            </template>
          </el-calendar>
        </div>
        <div class="calendar_things">
          <div class="input-warp">
            <p>{{currentdate}}</p>  
            <el-button type="primary" @click.native.prevent="addItemToList">添加事项</el-button>
          </div>
          <el-main class="td-main">
            <el-table
              ref="multipleTable"
              :data="infolist"
              :highlight-current-row="true"
              style="width: 100%"
            >
              <!-- <el-table-column type="selection" width="55" /> -->
              <el-table-column label="待办事项">
                <template slot-scope="item">
                  <div>{{ item.row.remindTime }}</div>
                  <div>{{ item.row.backlogContent }}</div>
                </template>
                <el-checkbox />
              </el-table-column>
              <el-table-column prop="name" label width="80px">
                <template slot-scope="item">
                  <el-button
                    v-if="item.row.status===0"
                    size="mini"
                    type="success"
                    icon="el-icon-check"
                    circle
                    @click="UpdateItemById(item.row.backlogId,1)"
                  />
                  <el-button
                    size="mini"
                    type="danger"
                    icon="el-icon-delete"
                    circle
                    @click="UpdateItemById(item.row.backlogId,2)"
                  />
                </template>
              </el-table-column>
            </el-table>
            <div class="footer">
              <span>{{ infolist.length }}条剩余</span>
              <el-radio-group v-model="status" size="small" @change="getbacklog">
                <el-radio-button class="btn-radio" :label="0">未完成</el-radio-button>
                <el-radio-button class="btn-radio" :label="1">已完成</el-radio-button>
              </el-radio-group>
            </div>
          </el-main>
        </div>
      </div>
    </div>
    <el-dialog
      title="待办事项"
      :visible.sync="show"
      width="25%"
      label-width="100px"
      :destroy-on-close="true"
      >
      <el-form ref="form" :model="form" :rules="rules" validate-on-rule-change="false">
        <el-form-item label="提醒时间:" prop="remindTime">
          <el-date-picker clearable
            v-model="form.remindTime"
            type="datetime"
            placeholder="选择日期时间"
            default-time="12:00:00"
            value-format="yyyy-MM-dd HH:mm:ss"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="待办事项:" prop="backlogContent">
          <el-input  clearable v-model="form.backlogContent" type="textarea" placeholder="请输入待办事项"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="show = false">取 消</el-button>
        <el-button type="primary" @click="handlerOk">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { formatedate, formate, time } from "@/utils/formatedate";
import {
  getBacklogList,
  addBacklog,
  updateBacklog,
  BacklogNum
} from "@/api/todolist";
const defaultform = {
  backlogContent: "",
  remindTime: ""
};
export default {
  name: "Todolist",
  data() {
    return {
      value: new Date(),
      show: false,
      status: 0,
      currentdate: "",
      calendarData: [],
      checkDate: "",
      checkListDate: "",
      searchParams: {
        remindTimeEnd: "",
        remindTimeStart: ""
      },
      infolist: [],
      form: Object.assign({}, defaultform),
      rules: {
        remindTime: [
          { required: true, message: "提醒时间不能为空！", trigger: "change" }
        ],
        backlogContent: [
          { required: true, message: "待办事项不能为空！", trigger: "blur" }
        ]
      }
    };
  },
  watch: {},
  created() {
    let date = new Date();
    let years = date.getFullYear(); //获取完整的年份(4位)
    let month = date.getMonth() + 1; //获取当前月份(0-11,0代表1月)
    this.checkListDate = years + "-" + month;
    this.currentdate = formatedate();
    this.checkDate = formate();
    this.getBacklogNum();
  },
  mounted() {
    this.$nextTick(() => {
      // 点击前一个月
      let prevBtn = document.querySelector(
        ".el-calendar__button-group .el-button-group>button:nth-child(1)"
      );
      prevBtn.addEventListener("click", () => {
        this.checkListDate = time(this.value);
        this.getBacklogNum();
      });
    });
    this.$nextTick(() => {
      // 点击后一个月
      let prevBtn = document.querySelector(
        ".el-calendar__button-group .el-button-group>button:last-child"
      );
      prevBtn.addEventListener("click", () => {
        console.log(this.value,"000")
        this.checkListDate = time(this.value);
        this.getBacklogNum();
      });
    });
    this.$nextTick(() => {
      // 点击今天
      let prevBtn = document.querySelector(
        ".el-calendar__button-group .el-button-group>button:nth-child(2 )"
      );
      prevBtn.addEventListener("click", () => {
        this.checkListDate = time(this.value);
        this.getBacklogNum();
      });
    });
    this.getbacklog();
  },
  methods: {
    //每月待办列表查看
    handleClick(data) {
      if (data.type === "current-month") {
        this.checkDate = data.day;
        this.getbacklog();
      } else if (data.type === "prev-month") {
        this.checkDate = data.day;
        this.checkListDate = data.day
          .split("-")
          .slice(0, 2)
          .join("-");
        this.getbacklog();
        this.getBacklogNum();
      } else if (data.type === "next-month") {
        this.checkDate = data.day;
        this.checkListDate = data.day
          .split("-")
          .slice(0, 2)
          .join("-");
        this.getBacklogNum();
        this.getbacklog();
      }
    },
    //获取一个月待办事件数
    getBacklogNum() {
      let params = {
        remindTime: this.checkListDate
      };
      BacklogNum(params).then(res => {
        if (res.code === 200) {
          this.calendarData = res.data;
        }
      });
    },
    //获取待办事项列表
    getbacklog() {
      let params = {
        remindDate: this.checkDate,
        status: this.status
      };
      getBacklogList(params).then(res => {
        if (res.code === 200) {
          this.infolist = res.data;
        }
      });
    },
    //添加事项
    handlerOk() {
      this.$refs.form.validate(valid => {
        if (valid) {
          let params = {
            backlogContent: this.form.backlogContent,
            remindTime: this.form.remindTime
          };
          addBacklog(params).then(res => {
            if (res.code === 200) {
              this.form = Object.assign({}, defaultform);
              this.show = !this.show;
              this.getbacklog();
              this.getBacklogNum();
              this.$message.success(res.msg);
            } else {
              this.$message.error(res.msg);
            }
          });
        } else {
          return false;
        }
      });
    },
    //添加
    addItemToList() {
      this.show = !this.show;
    },
    //更新事项状态
    UpdateItemById(val, type) {
      let params = {
        backlogIds: val,
        status: type === 1 ? 1 : 2
      };
      updateBacklog(params).then(res => {
        if (res.code === 200) {
          this.getbacklog();
          this.$message.success(res.msg);
        } else {
          this.$message.error(res.msg);
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
  .el-textarea {
    width: 71%;
  }
  .todolist-warp {
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    align-items: flex-start;
    flex-wrap: wrap;
    .title {
      font-size: 20px;
      margin-bottom: 20px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #909399;
    }
    .calendar {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      flex-wrap: nowrap;
      .calendar_even {
        width: 50%;
        .is-selected {
          color: #1989fa;
        }
      }
      .calendar_things {
        width: 50%;
        padding: 12px 20px;
        .input-warp {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          flex-wrap: nowrap;
        }
        .td-input {
          width: 85%;
          margin-right: 10px;
        }
        .td-main {
          width: 100%;
          margin-top: 10px;
          border-radius: 4px;
          border: 1px solid #dcdfe6;
        }
        .btn-close {
          float: right;
          margin-left: 10px;
        }
        .el-button--mini.is-circle {
          padding: 3px;
        }
        .footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 15px;
        }
      }
    }
  }
  .el-calendar-day {
    .is-selected {
      width: 20px;
      height: 20px;
      background-color: #1989fa;
      color: #fff !important;
      text-align: center;
      line-height: 20px;
      float: right;
    }
  }
  .calendar-day {
    height: 85px;
    text-align: center;
    line-height: 85px;
    font-size: 20px;
  }

  #calendar
    .el-button-group
    > .el-button:not(:first-child):not(:last-child):after {
    content: "当月";
  }
</style>
