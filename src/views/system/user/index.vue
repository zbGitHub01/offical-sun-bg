<template>
  <div class="app-container message-container user-wrap">
    <el-input v-model="search.username"
              placeholder="请输入用户账号"
              style="width: 200px"
              class="mb20"
              clearable
              @change="onSearch"></el-input>
    <div class="style-container mb20">
      <template v-for="(item,index) in searchCondition">
        <div class="item_warp"
             :key="index"
             @click="onUser(item.prop)">
          <div class="img_warp">
            <svg-icon :icon-class="item.icon" />
          </div>
          <div class="title_warp">{{item.title}}</div>
        </div>
      </template>
    </div>
    <template>
      <el-table border
                ref="multipleTable"
                :data="table.data">
        <template v-for="(item, index) in table.headerConfig">
          <div :key="index">
            <el-table-column v-if="item.key === 'picture'"
                             :property="item.key"
                             :label="item.title"
                             align="center"
                             :width="item.width"
                             :min-width="item.minWidth">
              <template slot-scope="scope">
                <el-image style="width: 150px"
                          :src="scope.row.picture"
                          :preview-src-list="[scope.row.picture]"
                          fit="contain"></el-image>
              </template>
            </el-table-column>
            <el-table-column v-else
                             :property="item.key"
                             :label="item.title"
                             align="center"
                             :width="item.width"
                             :min-width="item.minWidth" />
          </div>
        </template>
        <el-table-column property="enable"
                         align="center"
                         label="操作"
                         fixed="right"
                         width="250px">
          <template slot-scope="scope">
            <el-button type="text"
                       @click="onUser('edit', scope.row)">编辑</el-button>
            <el-button type="text"
                       @click="onDelete(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <pagination :total="table.total"
                  :page.sync="search.page"
                  :limit.sync="search.pageSize"
                  @pagination="getTableData" />
    </template>
    <form-dialog ref="formDialog"
                 @getTableData="getTableData"></form-dialog>
  </div>
</template>

<script>
import Pagination from "@/components/Pagination";
import FormDialog from './formDialog.vue';
export default {
  name: 'index',
  components: { Pagination, FormDialog },
  methods: {
    // 新增、编辑
    onUser (type, data) {
      this.$refs.formDialog.show(type, data)
    },
    // 删除
    onDelete (id) {
      this.$api.deleteUser({ id }).then(res => {
        if (res.isError) return this.$message.error(res.msg)
        this.$message.success('删除成功')
        this.getTableData()
      })
    },
    // 搜索
    onSearch () {
      this.search.page = 1
      this.getTableData()
    },
    //获取列表数据
    getTableData () {
      const params = {
        ...this.search
      }
      this.$deleteObjectEmptyAttr(params)
      this.$api.findPageUser(params).then(res => {
        if (res.isError) return this.$message.error(res.msg)
        this.table.data = res?.data?.data ?? []
        this.table.total = res?.data?.total ?? 0
      })
    },
  },
  data () {
    return {
      search: {
        page: 1,
        pageSize: 10,
        username: ''
      },
      selectedIds: [],
      searchCondition: [
        {
          title: "新增用户",
          icon: "add",
          prop: 'add'
        }
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
              key: "username",
              title: "用户账号",
              minWidth: 150,
            },
            {
              key: "roleName",
              title: "角色",
              minWidth: 150,
            }
          ]),
        data: [],
        total: 0
      }

    }
  },
  created () {
    this.getTableData()
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
    .img_warp {
      line-height: 20px;
    }
  }
}
.user-wrap {
  flex-direction: column;
}
</style>