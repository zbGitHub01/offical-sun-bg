<template>
  <span>
      <template v-if="row.mediateStatus === 0 ">
        <span>{{ row.inviteWorkNumber }}</span>
      </template>
       <template v-else-if="row.mediateStatus === 1 ">
        <span>{{ row.inviteWorkNumber }}</span>
      </template>
      <template v-else-if="row.mediateStatus === 2">
        <span>{{ row.inviteWorkNumber }}</span>
      </template>
       <template v-else>
        <router-link :to="'/desk/mediatedetail/'+row.caseUserId+'/'+row.id+'/'+row.creditorsId+'/'+row.mediateStatus"  >
        <a style="color: rgb(2, 167, 240)">{{ row.inviteWorkNumber }}</a>
      </router-link>
      </template>
  </span>
</template> 
<script>
export default {
    props:['row']
}
</script>
