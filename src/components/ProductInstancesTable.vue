<template>
  <div>
    <el-input 
      v-on:change="searchChanged"
      placeholder="Recherche" 
      v-model="search">
    </el-input>
    <el-table
      :data="this.productInstances"
      style="width: 100%">
      <el-table-column
        prop="label"
        label="Produits"
        >
      </el-table-column>
    </el-table>
  </div>
</template>

<script>

import { mapState } from 'vuex'
import * as types from '../store/mutation-types'

export default {
    name: 'product-instances-table',
    data() {
      return {
        search: ''
      }
    },
    computed: {
      ...mapState({
          productInstances: state => state.productInstances.productInstances,
      })
    },
    methods: {
      searchChanged(value) {
        this.$store.dispatch('loadAllProductInstancesByLabel', value)
      }
    }
  }
</script>