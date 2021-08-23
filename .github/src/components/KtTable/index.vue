<template>
  <div>
    <!--表格栏-->
    <el-table
      :data="data.data"
      border
      :max-height="maxHeight"
      :height="height"
      :size="size"
      :align="align"
      style="width: 100%"
    >
      <el-table-column
        v-for="column in columns"
        header-align="center"
        align="center"
        :prop="column.prop"
        :label="column.label"
        :width="column.width"
        :min-width="column.minWidth"
        :fixed="column.fixed"
        :key="column.prop"
        :type="column.type"
        :formatter="column.formatter"
        :sortable="column.sortable == null ? true : column.sortable"
      >
      </el-table-column>
      <el-table-column
        label="操作"
        width="185"
        fixed="right"
        header-align="center"
        align="center"
      >
        <template slot-scope="scope">
          <kt-button
            icon="fa fa-edit"
            label="编辑"
            :perms="permsEdit"
            :size="size"
            @click="handleEdit(scope.$index, scope.row)"
          />
          <!-- <kt-button icon="fa fa-trash" :label="$t('action.delete')" :perms="permsDelete" :size="size" type="danger" @click="handleDelete(scope.$index, scope.row)" /> -->
        </template>
      </el-table-column>
    </el-table>
    <!--分页栏-->
    <div class="toolbar" style="padding: 10px">
      <pagination
        :total="pageRequest.total"
        :page.sync="pageRequest.page"
        :limit.sync="pageRequest.pageSize"
        @pagination="findPage"
      />
    </div>
  </div>
</template>

<script>
import KtButton from "../KtButton";
import Pagination from "../Pagination"; // secondary package based on el-pagination
export default {
  name: "KtTable",
  components: {
    KtButton,
    Pagination,
  },
  props: {
    columns: Array, // 表格列配置
    data: Object, // 表格分页数据
    permsEdit: String, // 编辑权限标识
    permsDelete: String, // 删除权限标识
    pageRequest:Object, //分页
    size: {
      // 尺寸样式
      type: String,
      default: "mini",
    },
    align: {
      // 文本对齐方式
      type: String,
      default: "left",
    },
    maxHeight: {
      // 表格最大高度
      type: Number,
      default: 420,
    },
    height: {
      // 表格最大高度
      type: Number,
      default: 250,
    },
    border: {
      // 是否显示边框
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      loading: false, // 加载标识
    };
  },
  mounted() {
    console.log(this);
  },
  methods: {
    // 分页查询
    findPage: function () {
      this.$emit("findPage");
    },
    // 编辑
    handleEdit: function (index, row) {
      this.$emit("handleEdit", { index: index, row: row });
    },
  },
  mounted() {
    this.findPage();
  },
};
</script>

<style scoped>
</style>