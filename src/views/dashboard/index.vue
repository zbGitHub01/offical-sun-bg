<template>
  <div>
    <message />
    <todolist />
  </div>
</template> 
<script>
import Message from "./compontens/message.vue";
import Todolist from "./compontens/todolist.vue";
export default {
  name: "Dashboard",
  components: {
    Message,
    Todolist,
  },
  data() {
    return {
    };
  },
  methods:{
  }


};
</script>
<style lang="scss">
  .padding-16{
    padding: 16px;
  }
</style>