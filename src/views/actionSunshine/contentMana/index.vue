<template>
  <div class="app-container message-container article-wrap">
    <div class="content-header">
      <div class="content-title">
        <div>活动页面配置</div>
        <el-button type="primary" @click="dialogVisible=true">新增</el-button>
      </div>
      <div class="content-bo">
        <div class="style-container mb20">
          <div v-for="(item,index) in searchConditionArr" 
              :class="{'active': curChecked!==index}" 
              :key="index"
              @click="handleCheck(item,index)">
              <span>{{item.title}}</span>
          </div>
        </div>
        <div v-show="curChecked===0">
          <span class="sign">只显示报名</span>
          <el-switch v-model="delivery"></el-switch>
        </div>
      </div>
    </div>
    <div class="bkg"></div>
    <div class="content-body">
      <ul>
        <li 
          v-for="item,index in dataList"
          :key="index"
          >
          <el-image 
            style="width: 100px; height: 100px"
            :src="item.picture"
            :preview-src-list="[item.picture]">
          </el-image>
          <div class="sec-item">
            <div>
              <span>{{item.name}}</span><br/>
              <span>{{item.createTime}}</span>
            </div>
            <div>
              <span style="color: #666666;">浏览：<span style="color: #333333;">{{item.clicks}}</span></span>
              <span style="margin-left: 40px;color: #666666;">申请人数：<span style="color: #333333;">{{item.applicantNum}}</span></span>
            </div>
          </div>
          <div class="thi-item">
            <div :style="{'color':item.type === 0?'':'#FFA849'}">{{item.type === 0?'阳光工程活动':'阳光工程案例'}}</div>
            <div>
              <span @click="handleEdit(item.id)">编辑</span>
              <span @click="handleDel(item.id)">删除</span>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <pagination 
      :total="search.total"
      :pageSizes="[3,6,18,72]"
      :page.sync="search.page"
      :limit.sync="search.pageSize"
      @pagination="getTableData" />

    <edit-dialog
      :dialogFormVisible="dialogVisible"
      :defaultForm="defaultForm"
      :operationId="currentId"
      @onclose="handleClose"
      @flushPage="handleFlush"
      :dialogTitle = dialogTitle
      /> 
  </div>
</template>

<script>
import Pagination from "@/components/Pagination"
import EditDialog from './component/EditDialog.vue'
// import zhCN from 'element-ui/lib/locale/lang/zh-CN';
export default {
  name: 'index',
  components: { Pagination, EditDialog },
  data () {
    return {
      search: {
        page: 1,
        pageSize: 3,
        title: '',
        total: 6,
      },
      delivery: false,
      selectedIds: [],
      searchCondition: [
        {
          title: "阳光工程活动",
          prop: 'add'
        },
        {
          title: "阳光工程案例",
          prop: 'delete'
        },
      ],
      dataList: [],
      curChecked: -1,
      dialogVisible: false,
      dialogTitle: '新增',
      currentId: null, // 当前操作的项
      defaultForm: {}
    }
  },
  created () {
    this.getTableData({page: 1, pageSize: 3});
  },
  mounted () {
  },
  computed: {
    searchConditionArr() {
      const { searchCondition, curChecked } = this
      // index为1 即阳光工程案例时没有 是否有报名的按钮
      return ![-1,1].includes(curChecked)? searchCondition:searchCondition.slice(0,2)
    },
  },
  watch: {
    curChecked (newVal, oldVal) {
      const data = {
        page: this.search.page, 
        pageSize: this.search.pageSize,
        type: newVal === -1?null:newVal,
      }
      this.getTableData(data);
    },
    delivery (newVal, oldVal) {
      const data = {
        page: this.search.page, 
        pageSize: this.search.pageSize,
        type: this.curChecked === -1?null: this.curChecked,
        isApply: newVal?1:null
      }
      this.getTableData(data);
    },
  },
  methods: {
    // 刷新列表
    handleFlush() {
      this.dialogTitle = '新增'
      this.dialogVisible = false;
      this.$api.getContentList({...this.search}).then(res => {
        const { data, page, pageSize, total } = res.data;
        this.dataList = data;
        Object.assign(this.search, { page, pageSize, total });
      })
    },
    handleClose() {
      this.dialogTitle = '新增'
      this.dialogVisible = false;
    },
    // 编辑
    async handleEdit(val) {
      this.dialogTitle = '编辑';
      await this.findDataInfoById(val);
      this.currentId = val;
      this.dialogVisible = true;
    },
    // 根据Id查询回显
    findDataInfoById (id) {
      this.$api.findById(id).then(res => {
        if (res.isError) return this.$message.error(res.msg)
        const { name, id, picture, type, html, isApply, textType } = res?.data ?? {}
        this.defaultForm = { name, id, picture, type, html, isApply, textType }
      })
    },
    // 删除
    handleDel(val) {
      this.$confirm('确定删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning' 
      }).then(() => {
        this.$api.deleteById(val).then(res => {
          if (res.isError) return this.$message.error(res.msg)
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.getTableData({...this.search});
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });          
      });
    },
    // 获取列表数据
    getTableData(data) {
      this.$api.getContentList(data).then(res => {
        const { data, page, pageSize, total } = res.data;
        this.dataList = data;
        Object.assign(this.search, { page, pageSize, total });
      })
    },
    // 筛选
    handleCheck(item,index) {
      this.curChecked = this.curChecked === index ? -1 : index;
    },
    // 新增、编辑
    onAdvantage (type, id) {
      if (type === 'delete') return this.onSelectedDelete()
      const route = {
        name: 'Published',
        query: {
          id
        }
      }
      type === 'add' && delete route.query
      this.$router.push(route)
    },
    // 删除
    onDelete (id) {
      this.$api.deleteArticle({ id }).then(res => {
        if (res.isError) return this.$message.error(res.msg)
        this.$message.success('删除成功')
        this.getTableData()
      })
    },
    // 删除选中
    onSelectedDelete () {
      if (this.$isEmpty(this.selectedIds)) return this.$message.warning('请至少选中一条数据')
      this.$api.deleteListArticle({ idLists: this.selectedIds }).then(res => {
        if (res.isError) return this.$message.error(res.msg)
        this.$message.success('删除成功')
        this.getTableData()
      })
    },
    // 选中
    onSelectionChange (val) {
      this.selectedIds = Array.from(val, ({ id }) => id)
    },
    // 搜索
    onSearch () {
      this.search.page = 1
      this.getTableData()
    },
  },

}
</script>

<style lang='scss' scoped>

$pubMargin: 20px;
.app-container {
  padding: 0;
}
.bkg {
  width: 100%;
  height: 20px;
  background: #F5F7FA;
}
.message-container {
  background-color: none;
  -webkit-box-shadow: none;
  box-shadow: none;
}
.style-container {
  border: none;
  margin: 0;
  box-shadow: 0px 0px 0px 0px rgb(0 0 0);
  flex-direction: row;
  & div {
    cursor: pointer;
    margin: 20px 0px;
    width: 140px;
    height: 32px;
    background: #4D7CFE;
    text-align: center;
    box-shadow: 0px 2px 4px 0px rgba(0,0,0,0.02);
    line-height: 32px;
    border-radius: 4px;
    & span {
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #FFFFFF;
    }
  }
  .active {
    border: 1px solid #4D7CFE;
    background: none;
    border-radius: 4px;
    & span {
      color: #4D7CFE;
    }
  }
  & :nth-child(2n), :nth-child(3n) {
    margin-left: 20px;
  }
}
.article-wrap {
  flex-direction: column;
}
.content-header {
  padding: 20px;
  padding-bottom: 0;
  background-color: #fff;
  box-shadow: 0px 2px 4px 0px rgba(0,0,0,0.06);
  -webkit-box-shadow: 0px 2px 4px 0px rgba(0,0,0,0.06);
  border-radius: 4px;
  .content-title {
    display: flex;
    width: 100%;
    padding-bottom: 20px;
    border-bottom: 1px  solid #F1F1F1;
    align-items: center;
    justify-content: space-between;

    div {
      height: 22px;
      font-size: 18px;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      color: #333333;
      line-height: 22px;
    }
    .el-button {
      padding: 6px 0;
      width: 60px;
      height: 28px;
      background: #4D7CFE ;
    }
  }
 
}
.content-body {
  background: #F5F7FA;
  ul {
    margin: 0;
    padding: 0;
    list-style: none;
    li {
      display: flex;
      width: 100%;
      height: 186px;
      margin-bottom: 20px;
      background: #FFFFFF;
      .el-image {
        width: 220px !important;
        height: 146px !important;
        margin: $pubMargin;
      }
      .sec-item {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        margin: $pubMargin;
        margin-left: -4px;
        & div:first-child  {
          & span:nth-child(1) {
            font-size: 24px;
            font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, Arial, sans-serif;
            font-weight: bold;
            color: #333333;
            & + br + span {
              display: inline-block;
              margin-top: 16px;
              font-family: PingFangSC-Regular, PingFang SC;
              font-weight: 400;
              color: #999999;
            }
          }
        }
      }
      .thi-item {
        display: flex;
        flex: 1;
        margin: 20px;
        flex-direction: column;
        justify-content: space-between;
        text-align: right;
        & div:nth-child(1) {
          font-size: 18px;
          font-family: PingFang-SC-Bold, PingFang-SC;
          font-weight: bold;
          color: #4D7CFE;
          & + div span:first-child {
            cursor: pointer;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #4D7CFE;
            & + span {
              cursor: pointer;
              margin-left: 10px;
              font-family: PingFangSC-Regular, PingFang SC;
              font-weight: 400;
              color: #FF584A;
            }
          }
        }
      }
    }
  }
}
.content-bo {
  display: flex;
  align-items: center;
  justify-content: space-between;
  span {
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #4D7CFE;
  }
  .sign {
    margin-right: 10px;
  }
}
 ::v-deep .el-dialog {
  margin-top: 5vh !important;
}
</style>