<template>
  <div class="app-container message-container article-wrap">
    <div class="content-header">
      <div class="content-title">
        <div>活动页面配置</div>
        <el-button type="primary" @click="dialogVisible=true">新增</el-button>
      </div>
      <div class="style-container mb20">
        <div v-for="(item,index) in searchConditionArr" 
            :class="{'active': curChecked!==index}" 
            :key="index"
            @click="handleCheck(item,index)">
            <span>{{item.title}}</span>
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
            :src="item.url" 
            :preview-src-list="item.srcList">
          </el-image>
          <div class="sec-item">
            <div>
              <span>{{item.name}}</span><br/>
              <span>{{item.time}}</span>
            </div>
            <div>
              <span>浏览：{{item.lNum}}</span>
              <span>申请人数：{{item.pNum}}</span>
            </div>
          </div>
          <div class="thi-item">
            <div :style="{'color':item.isSun?'':'#FFA849'}">{{item.isSun?'阳光工程项目':'阳光工程活动'}}</div>
            <div>
              <span @click="handleEdit">编辑</span>
              <span @click="handleDel">删除</span>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <pagination :total="total"
      :pageSizes="[3,6,18,72]"
      :page.sync="search.page"
      :limit.sync="search.pageSize"
      @pagination="getTableData" />

    <edit-dialog
      :dialogFormVisible="dialogVisible" 
      @onclose="handleClose"
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
        title: ''
      },
      selectedIds: [],
      searchCondition: [
        {
          title: "阳光工程项目",
          prop: 'add'
        },
        {
          title: "阳光工程活动",
          prop: 'delete'
        },
        {
          title: "有报名",
          prop: 'add'
        },
        {
          title: "未报名",
          prop: 'delete'
        },
      ],
      dataList: [{
        time: '2016-05-02',
        name: '北京站',
        lNum: 1234,
        pNum: 1234,
        isSun: true,
        url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
        srcList: [
          'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
          'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg'
        ]
      }, {
        time: '2016-05-04',
        name: '北京站',
        lNum: 1234,
        pNum: 1234,
        isSun: false,
        url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
        srcList: [
          'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
          'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg'
        ],
      }, {
        time: '2016-05-01',
        name: '北京站',
        lNum: 1234,
        pNum: 1234,
        isSun: true,
        url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
        srcList: [
          'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
          'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg'
        ]
      }, {
        time: '2016-05-04',
        name: '北京站',
        lNum: 1234,
        pNum: 1234,
        isSun: false,
        url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
        srcList: [
          'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
          'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg'
        ],
      }, {
        time: '2016-05-04',
        name: '北京站',
        lNum: 1234,
        pNum: 1234,
        isSun: false,
        url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
        srcList: [
          'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
          'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg'
        ],
      }, {
        time: '2016-05-04',
        name: '北京站',
        lNum: 1234,
        pNum: 1234,
        isSun: false,
        url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
        srcList: [
          'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
          'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg'
        ],
      }],
      curChecked: -1,
      dialogVisible: false,
      total: 6,
      dialogTitle: '新增',
    }
  },
  created () {
    // this.getTableData()
  },
  mounted () {
  },
  computed: {
    searchConditionArr() {
      const { searchCondition, curChecked } = this
      // index为1 即阳光工程活动时没有 是否有报名的按钮
      return ![-1,1].includes(curChecked)? searchCondition:searchCondition.slice(0,2)
    }
  },
  methods: {
    handleClose() {
      this.dialogTitle = '新增'
      this.dialogVisible = false
    },
    // 编辑
    handleEdit() {
      this.dialogTitle = '编辑'
      this.dialogVisible = true 
    },
    // 删除
    handleDel() {
      this.$confirm('确定删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning' 
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });          
      });
    },
    // 获取列表数据
    getTableData(val) {
      console.log(val)
    },
    // 筛选
    handleCheck(item,index) {
      this.curChecked = index;
      console.log(index)
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
      width: 108px;
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
            font-family: PingFang-SC-Bold, PingFang-SC;
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
          & + div span:last-child {
            margin-left: 40px;
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
 ::v-deep .el-dialog {
  margin-top: 5vh !important;
}
</style>