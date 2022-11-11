<template>
<div class="app-container message-container type-wrap column">
    <div class="style-container mb20">
        <div v-for="(item,index) in searchCondition" :key="index">
            <div class="item_warp"
                @click="onCondition(item.prop)">
            <div class="img_warp">
                <svg-icon :icon-class="item.icon" />
            </div>
            <div class="title_warp">{{item.title}}</div>
            </div>
        </div>
        </div>
        <template>
        <el-table border
                    @selection-change="onSelectionChange"
                    ref="multipleTable"
                    row-key="id"
                    :data="table.data">
            <el-table-column type="selection"
                            align="center"
                            fixed="left"
                            width="50" />
            <div v-for="(item, index) in table.headerConfig" :key="index">
                <el-table-column 
                :property="item.key"
                :label="item.title"
                align="center"
                :width="item.width"
                :min-width="item.minWidth" />
            </div>
            <el-table-column property="enable"
                            align="center"
                            label="备注"
                            width="150px">
              <template slot-scope="scope">
                  <el-popconfirm
                      :title="scope.row.remark"
                      icon="el-icon-info"
                      >
                    <el-button slot="reference">查看</el-button>
                  </el-popconfirm>
              </template>
            </el-table-column>
        </el-table>
        <pagination 
            :total="table.total"
            :page.sync="search.page"
            :limit.sync="search.pageSize"
            @pagination="getTableData" />
        </template>
    </div>
</template>

<script>
import Pagination from "@/components/Pagination";
import { HeaderList } from './tableHeader/index.js'
export default {
name: 'index',
components: { Pagination },
methods: {
    // 编辑
    onEdit (type, data) {
    this.$refs.addDialog.show(type, data)
    },
    // 导出
    onCondition (type) {
    if (this.selectedIds.length === 0) {
        return this.$message.warning("请先选择操作对象!");
    }
    const exportParams = {
        exportType: 2, //1:按查询结果导出 2：按选中项导出
        idSet: this.selectedIds,
        param: { ...this.search }
    }
    this.$api.exportExcel(exportParams).then(res => {
        if (res.isError) return this.$message.error(res.msg)
        window.open(res.data.url)
        this.$message.success('导出成功')
    })


    },
    // 选中
    onSelectionChange (val) {
      this.selectedIds = Array.from(val, ({ id }) => id)
    },
    //获取列表数据
    getTableData () {
    const params = {
        ...this.search
    }
    this.$deleteObjectEmptyAttr(params)
    this.$api.getSignList(params).then(res => {
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
        name: '',
        createTime: '',
        phone: '',
        idCard: '',
        workAddress: '',
        registerLocation: '',
        activitiesName: '',
        remark: '',
    },
    selectedIds: [],
    searchCondition: [
        {
        title: "导出",
        icon: "export",
        prop: 'delete'
        },
    ],
    table: {
        headerConfig: Object.freeze(HeaderList),
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
.mr20 {
margin-right: 20px !important;
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