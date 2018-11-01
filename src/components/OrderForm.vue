<template>
 <div class="middle row col-md-12">
  <div class="card col-md-10">
    <div class="card-body">
      <h2 class="card-title"> Informations </h2>
      <div class="form-group">
        <label for="identifiant">Identifiant</label>
        <input type="Number" v-model="order.id" class="form-control col-sm-6" id="identifiant" disabled placeholder="Id">
      </div>
      <div class="form-group">
        <label for="identifiantMag">Identifiant magasin</label>
        <input type="Number" v-model="order.idExt" class="form-control col-sm-6" id="identifiantMag" disabled placeholder="Id">
      </div>
      <div class="form-group">
        <label for="date">Date d'achat</label>
        <input type="date" v-model="order.date" class="form-control col-sm-6" id="date" disabled placeholder="Id">
      </div>
   </div>
  </div>

  <div class="card col-md-10">
    <div class="card-body">
      <h2 class="card-title"> Produits </h2>
      <el-table
        ref="items"
        :data="this.order.products"
        :default-sort = "{prop: 'label', order: 'ascending'}"
        style="width: 100%">
         <el-table-column
          type="index"
          width="50">
        </el-table-column>
        <el-table-column
          label="Produit"
          >
          <template slot-scope="scope">
            <div class="row col-md-12 cell-select" @click="selectproduct(scope.row)">
              <p-image class="col-md-2 thumbnail" :url="scope.row.image"  />
              <div class="col-md-9">{{ scope.row.label }}</div>
            </div>
          </template>  
        </el-table-column>
        <el-table-column
            label="Quantité"
            width="80"
            prop="quantity"
            >
        </el-table-column>
      </el-table>
    </div>
  </div>
  

</div>
</template>

<script>
import { mapState } from "vuex";
import * as types from "../store/mutation-types";
import Nutriscore from "./Nutriscore";
import Nova from "./Nova";
import PImage from "./PImage";

export default {
  name: "order-form",
  components: {
    PImage,
    Nutriscore,
    Nova
  },
  data() {
    return {
    };
  },
  mounted() {
    const id = this.$route.params.id;
    if (id) {
      this.$store.dispatch("selectOrder", { customer: "olivia.benjamin.corre@gmail.com" , id});
    }
  },
  computed: {
    ...mapState({
      order: state => state.orders.orderSelected
    })
  },
  watch: {
    "$route.params.id"(id) {
      if (id) {
        this.$store.dispatch("selectOrder", { customer: "olivia.benjamin.corre@gmail.com" , id});
      }
    }
  },
  methods: {
    update() {
      this.$store.dispatch("updateOrder", this.order);
    },
    
  }
};
</script>
<style>
img.thumbnail {
  height: 100%;
  max-width: 6em;
}
</style>
