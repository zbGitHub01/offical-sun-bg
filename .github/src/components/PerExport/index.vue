<template>
    <div>
        <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
         <el-checkbox-group v-model="checketitle" @change="handleCheckedCitiesChange">
                <el-checkbox style="width:12%" v-for="item in titleData" :label="item" :key="item">{{item}}</el-checkbox>
            </el-checkbox-group>
        <div>
        </div>
    </div>
    
</template>
<script>
export default {
    props:['titleData'],
    data() {
        return {
            isIndeterminate:true,
            checketitle: [],
            checkAll: false,
        }
    },
    methods:{
        //全选
        handleCheckAllChange(val) {
        this.checketitle = val ? this.titleData : [];
        this.isIndeterminate = false;
        },
        //单选
        handleCheckedCitiesChange(value) {
        let checkedCount = value.length;
        this.checkAll = checkedCount === this.titleData.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.titleData.length;
        }
    }
}
</script>
<style lang="scss">
.el-divider__text.is-left{
    left:0;
    padding:0;
    color:#AAAAAA
}
</style>
