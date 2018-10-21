<template>
  <img :src="novaImg">
</template>

<script>

import nova_0 from '../../images/nova-group-0.png'
import nova_1 from '../../images/nova-group-1.svg'
import nova_2 from '../../images/nova-group-2.svg'
import nova_3 from '../../images/nova-group-3.svg'
import nova_4 from '../../images/nova-group-4.svg'

export default {
    name: 'nova',
    
    props: {
      score: null
    },
    computed: {
      novaImg()  {
        if (!this.score) {
          return nova_0 
        }
        switch (this.score) {
          case 1: return nova_1
          case 2: return nova_2
          case 3: return nova_3
          case 4: return nova_4
        }
        return nova_0 
      }
    },
  }
</script>
