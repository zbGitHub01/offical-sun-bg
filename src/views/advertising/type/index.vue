<template>
  <div class="app-container message-container type-wrap column">
    <el-input v-model="search.name"
              placeholder="请输入类型名称"
              style="width: 200px"
              class="mb20"
              clearable
              @change="onSearch"></el-input>
    <div class="style-container mb20">
      <template v-for="(item,index) in searchCondition">
        <div class="item_warp"
             :key="index"
             @click="onAdvantageCategory(item.prop)">
          <div class="img_warp">
            <svg-icon :icon-class="item.icon" />
          </div>
          <div class="title_warp">{{item.title}}</div>
        </div>
      </template>
    </div>
    <template>
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
                       @click="onAdvantageCategory('edit',scope.row)">编辑</el-button>
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
    <add-dialog ref="addDialog"
                @getTableData="getTableData"></add-dialog>
  </div>
</template>

<script>
import Pagination from "@/components/Pagination";
import AddDialog from './AddDialog.vue'
export default {
  name: 'index',
  components: { Pagination, AddDialog },
  methods: {
    // 新增、编辑
    onAdvantageCategory (type, data) {
      this.$refs.addDialog.show(type, data)
    },
    // 删除
    onDelete (id) {
      this.$api.deleteAdvantageCategory({ id }).then(res => {
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
      this.$api.findPageAdvantageCategory(params).then(res => {
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
        name: ''
      },
      searchCondition: [
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
              key: "name",
              title: "类别名称"
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
    .img_warp {
      line-height: 20px;
    }
  }
}
.type-wrap {
  flex-direction: column;
}
</style>