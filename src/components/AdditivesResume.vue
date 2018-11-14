<template>
<div>
  <div v-for="additive of additives" :key="additive.riskLevel">
    <el-tag :type="getType(additive.riskLevel)">{{ additive.additives.length }} additif(s) présent(s) <b>{{ additive.additives[0].risks }}</b></el-tag>
  </div>
</div>
  
</template>

<script>



export default {
    name: 'additives-resume',   
    props: {
      additives: null
    },
    methods: {
      getType(level) {
        switch(level) {
          case 1: return 'success';
          case 2: return 'low';
          case 3: return '';
          case 4: return 'info';
          case 5: return 'warning';
          case 6: return 'danger';
        }
      }
    }
  }
</script>
<style>
  span.el-tag {
    margin-bottom: 1em;
  }
  span.el-tag--low {
    background-color: rgba(249, 243, 42, 0.12);
    border-color: #9da00047;
    color: #9da000;
  }
</style>
