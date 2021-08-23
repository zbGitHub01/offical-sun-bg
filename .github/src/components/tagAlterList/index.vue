<template>
  <div>
    <template>
        <span v-for="(item, index) in row.tagAlterList" :key="index">
      <span v-if="item.isShare === 1" style="color: red">{{
        index === row.tagAlterList.length - 1
          ? item.tagAlertName
          : item.tagAlertName + ","
      }}</span>
      <span v-else>{{
        index === row.tagAlterList.length - 1
          ? item.tagAlertName
          : item.tagAlertName + ","
      }}</span>
    </span>
    </template>
  </div>
</template>
<script>
export default {
    props:['row']
}
</script>