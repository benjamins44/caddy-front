<template>
  <div>
    <span  v-html="ingredientsList">  </span>
  </div>
</template>

<script>

export default {
    name: 'ingredients-list',
    
    props: {
      ingredientsList: null
    },
  }
</script>
<style>
span.allergen { 
  font-weight: bold;
}
</style>

