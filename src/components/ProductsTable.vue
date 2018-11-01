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
import { mapState } from "vuex";

export default {
  name: "products-table",
  data() {
    return {
      search: "",
      init: false
    };
  },
  mounted() {
    const id = this.$route.params.id;
    if (id) {
      this.init = true;
    } else {
      this.selectProduct(this.products[0]);
    }
  },
  computed: {
    ...mapState({
      products: state => state.products.products
    }),
    myProducts() {
      return this.products;
    }
  },
  watch: {
    myProducts(newProduct, oldProduct) {
      if (!this.init && newProduct && newProduct.length > 0) {
        this.selectProduct(newProduct[0]);
        this.init = true;
      }
    },
    "$route.params.id"(id) {
      if (!id) {
        this.selectProduct(this.products[0]);
        this.init = true;
      }
    }
  },
  methods: {
    searchChanged(value) {
      if (!this.search) {
        this.$store.dispatch("loadAllProducts");
      } else if (this.search && this.search.length > 2) {
        this.$store.dispatch("loadAllProductsByLabel", this.search);
      }
    },
    selectProduct(product) {
      const navigation = `/my-products/${product.id}`;
      this.$router.push(navigation);
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