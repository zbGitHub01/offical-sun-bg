<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  created(){
     const start = new Date()
     let date = start.setTime(new Date(new Date().getFullYear(), new Date().getMonth(), 2)) 
     new Date(date).toISOString().split('T')[0];
  }
  
};
</script>
