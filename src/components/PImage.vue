<template>
  <img :src="image">
</template>

<script>

import no_image from '../../images/no_image.png'

export default {
    name: 'pimage',
    
    props: {
      url: null
    },
    computed: {
      image()  {
        if (!this.url) {
          return no_image 
        }
        return this.url 
      }
    },
  }
</script>
