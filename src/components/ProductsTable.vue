<template>
  <div class="drawer">
    <el-input 
      v-on:keyup.native="searchChanged"
      placeholder="Recherche" 
      v-model="search">
    </el-input>
    <el-table
      :data="this.products"
      v-on:cell-click="selectproduct"
      style="width: 100%">
      <el-table-column
        class-name="pointer"
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
    name: 'products-table',
    data() {
      return {
        search: ''
      }
    },
    computed: {
      ...mapState({
          products: state => state.products.products,
      })
    },
    mounted() {
      this.$store.dispatch('loadAllProducts')
    },
    methods: {
      searchChanged(value) {
        if (!this.search) {
          this.$store.dispatch('loadAllProducts')
        }
        else if (this.search && this.search.length > 2) {
          this.$store.dispatch('loadAllProductsByLabel', this.search)
        }
      },
      selectproduct(product) {
        this.$store.dispatch('selectProduct', product.id)
      }
    }
  }
</script>
<style>
  .drawer {
    padding: 0.5em;
  }
  .pointer {
    cursor: pointer;
  }
</style>