<template>
    <div class="more">
        <el-dropdown placement="bottom-start" @command="handleClick" > 
        <svg-icon style="width:20px;height:20px" icon-class="more" />
        <el-dropdown-menu slot="dropdown">
            <template v-if="type!=1">
                <el-dropdown-item :command='command' ><i class="el-icon-edit-outline"></i>{{this.type===7?'标记标签' : '更新资料'}} </el-dropdown-item>
            </template>
                <el-dropdown-item :command='command1' ><i class="el-icon-chat-dot-round"></i>历史记录</el-dropdown-item>
        </el-dropdown-menu> 
      </el-dropdown>
    </div>
</template>
<script>
export default {
    props:['type'],
    data(){
        return{
         command:1,
         command1:2   
        }
    },
    methods:{
        handleClick(type){
            this.$emit('open',type,this.type)
        }
    }
}
</script>
<style lang="scss">
    .more{
        display: inline-flex;
    }
</style>