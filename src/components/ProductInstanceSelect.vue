<template>
  <el-select v-model="productInstanceSelected" value-key="id" filterable placeholder="Sélectionnez l'instance">
    <el-option
      v-for="item in productInstances"
      :key="item.id"
      :label="item.label"
      :value="item">
      <div class="row">
        <div class="col-sm-2"><p-image :url="item.image" class="thumbnail" /></div>
        <div class="col-sm-10">{{ item.label }}</div>
      </div>
    </el-option>
  </el-select>
  
</template>

<script>
import { mapState } from "vuex";
import PImage from "./PImage";

export default {
  name: "product-instance-select",
  props: {
    value: {}
  },
  data() {
    return {
      productInstanceSelected: {}
    };
  },
  components: {
    PImage
  },
  computed: {
    ...mapState({
      productInstances: state => state.productInstances.productInstances
    })
  },
  watch: {
    productInstanceSelected() {
      this.$emit("input", this.productInstanceSelected);
    },
    value: {
      handler(newValue, oldValue) {
        this.productInstanceSelected = newValue;
      }
    }
  }
};
</script>
<style>
div.el-select {
  width: 100%;
}
img.thumbnail {
  height: 2em;
}
</style>
