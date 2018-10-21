<template>
  <img :src="nutriscoreImg">
</template>

<script>

import nutriscore_A from '../../images/nutriscore_A.png'
import nutriscore_B from '../../images/nutriscore_B.png'
import nutriscore_C from '../../images/nutriscore_C.png'
import nutriscore_D from '../../images/nutriscore_D.png'
import nutriscore_E from '../../images/nutriscore_E.png'
import nutriscore_notset from '../../images/nutriscore_notset.png'

export default {
    name: 'nutriscore',
    
    props: {
      letter: null
    },
    computed: {
      nutriscoreImg()  {
        if (!this.letter) {
          return nutriscore_notset
        }
        switch (this.letter.toUpperCase()) {
          case 'A': return nutriscore_A
          case 'B': return nutriscore_B
          case 'C': return nutriscore_C
          case 'D': return nutriscore_D
          case 'E': return nutriscore_E
        }
        return nutriscore_notset
      }
    },
  }
</script>
