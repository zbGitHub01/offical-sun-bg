<template>
  <div class="app-container message-container banner-wrap">
    <el-select v-model="search.CId"
               placeholder="请选择广告类别"
               clearable
               @change="onSearch"
               class="w200 mb20">
      <el-option v-for="item in cidOptions"
                 :key="item.id"
                 :label="item.name"
                 :value="item.id">
      </el-option>
    </el-select>
    <div class="style-container mb20">
      <template v-for="(item,index) in searchCondition">
        <div class="item_warp"
             :key="index"
             @click="onAdvantage(item.prop)">
          <div class="img_warp">
            <svg-icon :icon-class="item.icon" />
          </div>
          <div class="title_warp">{{item.title}}</div>
        </div>
      </template>
    </div>
    <template>
      <el-table border
                @selection-change="onSelectionChange"
                ref="multipleTable"
                :data="table.data">
        <el-table-column type="selection"
                         align="center"
                         fixed="left"
                         width="50" />
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
                       @click="onAdvantage('edit', scope.row)">编辑</el-button>
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
                 :cidOptions='cidOptions'
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
    onAdvantage (type, data) {
      if (type === 'delete') return this.onSelectedDelete()
      this.$refs.formDialog.show(type, data)
    },
    // 删除
    onDelete (id) {
      this.$api.deleteAdvantage({ id }).then(res => {
        if (res.isError) return this.$message.error(res.msg)
        this.$message.success('删除成功')
        this.getTableData()
      })
    },
    // 删除选中
    onSelectedDelete () {
      if (this.$isEmpty(this.selectedIds)) return this.$message.warning('请至少选中一条数据')
      this.$api.deleteListAdvantage({ idLists: this.selectedIds }).then(res => {
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
    // 获取广告分类
    findByAllAdvantageCategory () {
      this.$api.findByAllAdvantageCategory().then(res => {
        if (res.isError) return this.$message.error(res.msg)
        this.cidOptions = res?.data ?? []
      })
    },
    //获取列表数据
    getTableData () {
      const params = {
        ...this.search
      }
      this.$deleteObjectEmptyAttr(params)
      this.$api.findPageAdvantage(params).then(res => {
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
        CId: ''
      },
      selectedIds: [],
      cidOptions: [],
      searchCondition: [
        {
          title: "新增广告图",
          icon: "add",
          prop: 'add'
        },
        {
          title: "删除广告图",
          icon: "dellabel",
          prop: 'delete'
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
              key: "title",
              title: "标题",
              minWidth: 150,
            },
            {
              key: "name",
              title: "类别",
              width: 200,
            },
            {
              key: "picture",
              title: "图片",
              width: 200,
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
  },
  created () {
    this.findByAllAdvantageCategory()
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
.banner-wrap {
  flex-direction: column;
}
</style>