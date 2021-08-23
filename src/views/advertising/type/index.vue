<template>
  <div class="app-container message-container type-wrap column">
    <el-input v-model="search.name"
              placeholder="请输入广告类型"
              style="width: 200px"
              class="mb20"></el-input>
    <div class="style-container mb20">
      <template v-for="(item,index) in lableData">
        <div class="item_warp"
             :key="index"
             @click="onStatusClick(item.prop)">
          <div class="img_warp">
            <svg-icon :icon-class="item.icon" />
          </div>
          <div class="title_warp">{{item.title}}</div>
        </div>
      </template>
    </div>
    <div class="">
      <el-table border
                :data="table.data">
        <template v-for="(item, index) in table.headerConfig">
          <el-table-column :key="index"
                           :property="item.key"
                           :label="item.title"
                           align="center"
                           :width="item.width" />
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
    <add-dialog ref="addDialog"></add-dialog>
  </div>
</template>

<script>
import Pagination from "@/components/Pagination"; // secondary package based on el-pagination
import AddDialog from './AddDialog.vue'
export default {
  name: 'index',
  components: { Pagination, AddDialog },
  methods: {
    onStatusClick (type) {
      this.$refs.addDialog.show(type)
    },
    handledel () {

    },
    handleeditClick () {

    },
    handleSelectionChange () {

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
        name: ''
      },
      lableData: [
        {
          title: "添加类别",
          prop: 'add',
          icon: "add",
        }
      ],
      table: {
        headerConfig: Object.freeze(
          [
            {
              key: "id",
              title: "Id"
            },
            {
              key: "picture",
              title: "类别名称"
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
.column {
  flex-direction: column !important;
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
.type-wrap {
  flex-direction: column;
}
</style>