<template>
  <div class="drawer">
    <el-input 
      v-on:keyup.native="searchChanged"
      placeholder="Recherche" 
      v-model="search">
    </el-input>
    <el-table
      :data="this.productInstances"
      empty-text="Merci de rechercher"
      v-on:cell-click="selectProductInstance"
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
import { mapState } from "vuex";
import * as types from "../store/mutation-types";

export default {
  name: "product-instances-table",
  data() {
    return {
      search: "",
      init: false,
    };
  },
  computed: {
    ...mapState({
      productInstances: state => state.productInstances.productInstances,
    }),
    myProductsInstance() {
      return this.productInstances;
    }
  },
  mounted() {
    console.log('mounted');
    const id = this.$route.params.id;
    if (id) {
      this.init = true;
    } else {
      this.selectProductInstance(this.productInstances[0]);
    }
  },
  watch: {
    myProductsInstance(newProduct, oldProduct) {
      if (!this.init && newProduct && newProduct.length > 0) {
        this.selectProductInstance(newProduct[0]);
        this.init = true;
      }
    },
    "$route.params.id"(id) {
      if (!id) {
        this.selectProductInstance(this.productInstances[0]);
        this.init = true;
      }
    },
  },
  methods: {
    searchChanged(value) {
      if (this.search && this.search.length > 2) {
        this.$store.dispatch("loadAllProductInstancesByLabel", this.search);
      }
    },
    selectProductInstance(productInstance) {
      if (productInstance) {
        const navigation = `/base-products/${productInstance.id}`;
        this.$router.push(navigation);
      }
    }
  }
};
</script>
<style>
.drawer {
  padding: 0.5em;
}
.pointer {
  cursor: pointer;
}
</style>