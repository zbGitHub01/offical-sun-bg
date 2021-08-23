<template>
  <div class="app-container message-container banner-wrap">
    <el-select v-model="search.Cid"
               placeholder="请选择广告类型"
               style="width: 200px"
               class="mb20">
      <el-option v-for="item in cidOptions"
                 :key="item.id"
                 :label="item.name"
                 :value="item.id">
      </el-option>
    </el-select>
    <div class="style-container mb20">
      <template v-for="(item,index) in lableData">
        <div class="item_warp"
             :key="index"
             @click="handlestatusClick(item.title)">
          <div class="img_warp">
            <svg-icon :icon-class="item.icon" />
          </div>
          <div class="title_warp">{{item.title}}</div>
        </div>
      </template>
    </div>
    <div class="style-container style">
      <el-table border
                @selection-change="handleSelectionChange"
                ref="multipleTable"
                :data="table.data">
        <el-table-column type="selection"
                         align="center"
                         fixed="left"
                         width="50" />
        <template v-for="(item, index) in table.headerConfig">
          <div :key="index">
            <el-table-column :property="item.key"
                             :label="item.title"
                             align="center"
                             :width="item.width" />
          </div>
        </template>
        <el-table-column property="enable"
                         align="center"
                         label="操作"
                         fixed="right"
                         width="250px">
          <template slot-scope="scope">
            <el-button type="text"
                       @click="handleeditClick(scope.row)">编辑</el-button>
            <el-button type="text"
                       @click="handledel(scope.row,'删除')">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <pagination :total="table.total"
                  :page.sync="search.page"
                  :limit.sync="search.pageSize"
                  @pagination="getuser" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'index',
  methods: {
    handlestatusClick () {

    },
    handledel () {

    },
    handleeditClick () {

    },
    //获取员工列表
    getuser () {
      // let params = Object.assign({}, this.$refs.formInline.formInline);
      // params["page"] = this.searchParams.page;
      // params["pageSize"] = this.searchParams.pageSize;
      // params["positionStatus"] = 1;
      // this.selectParams = Object.assign({}, params);
      // if(this.commandType===2){
      //   this.handleparams = {
      //     sysOrgUserSearchParam: Object.assign({},  params),
      //     operateType: 2
      //   }
      // }
      // userlist(params).then((res) => {
      //   if (res.code === 200) {
      //     this.tableData = res.data.data;
      //     this.searchParams["page"] = res.data.page;
      //     this.searchParams["total"] = res.data.total;
      //   }
      // });
    },
  },
  data () {
    return {
      search: {
        page: 1,
        pageSize: 10,
        CId: ''
      },
      cidOptions: [
        {
          id: '1',
          name: '首页'
        },
        {
          id: '2',
          name: '关于东岸'
        },
        {
          id: '1',
          name: '联系我们'
        }
      ],
      lableData: [
        {
          title: "添加轮播图",
          icon: "add",
        },
        {
          title: "删除选中",
          icon: "dellabel",
        },
      ],
      table: {
        headerConfig: Object.freeze(
          [
            {
              key: "id",
              title: "Id",
              width: 200,
            },
            {
              key: "picture",
              title: "图片",
              width: 200,
            },
            {
              key: "title",
              title: "标题",
              // width: 150,
            },
            {
              key: "time",
              title: "创建时间",
              width: 350,
            }
          ]),
        data: [],
        total: 0
      }

    }
  }
}
</script>

<style lang='scss' scoped>
.mb20 {
  margin-bottom: 20px !important;
}
.style-container {
  border: none;
  margin: 0;
  box-shadow: 0px 0px 0px 0px rgb(0 0 0);
  flex-direction: row;
  .item_warp {
    margin: 0 10px 0 0;
  }
}
.banner-wrap {
  flex-direction: column;
}
</style>