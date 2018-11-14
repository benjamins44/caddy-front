<template>
  <div>
    <el-dialog
      title="Confirmaton"
      :visible.sync="dialogVisible"
      width="30%"
    >
      <span>Souhaitez-vous vraiment supprimer ce produit du panier ?</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">Annuler</el-button>
        <el-button type="primary" @click="confirmRemoveProduct()">Confirmer</el-button>
      </span>
    </el-dialog>

    <div class="middle row col-md-12">
      <div class="card col-md-10">
        <div class="card-body">
          <h2 class="card-title"> Produits </h2>
          <el-table
            ref="items"
            :data="this.preOrder.products"
            :default-sort = "{prop: 'label', preOrder: 'ascending'}"
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
                  <p-image class="col-md-2 thumbnail" :url="scope.row.favorite.image"  />
                  <div class="col-md-9">{{ scope.row.favorite.label }}</div>
                </div>
              </template>  
            </el-table-column>
            <el-table-column
                label="Quantité"
                width="80"
                prop="quantity"
                >
            </el-table-column>
            <el-table-column
              fixed="right"
              width="100"
              >
              <template slot-scope="scope">
                <el-tooltip content="Supprimer du panier" placement="bottom">
                  <v-icon @click="removeProduct(scope.$index, scope.row)" class="trash">fa-trash</v-icon>
                </el-tooltip>
              </template>
            </el-table-column>
          </el-table>
        </div>
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
  name: "pre-preOrder-form",
  components: {
    PImage,
    Nutriscore,
    Nova
  },
  data() {
    return {
      dialogVisible: false,
      currentProduct:{},
    };
  },
  mounted() {
    this.$store.dispatch('getLastPreOrder', 'olivia.benjamin.corre@gmail.com');
  },
  computed: {
    ...mapState({
      preOrder: state => state.preOrders.preOrderSelected
    })
  },
  methods: {
    removeProduct(index, product) {
      this.currentProduct = product;
      this.dialogVisible = true;
    },
    confirmRemoveProduct() {
      this.preOrder.products.splice(this.preOrder.products.indexOf(this.currentProduct), 1);
      this.$store.dispatch("updatePreOrder", { order: this.preOrder, customer: 'olivia.benjamin.corre@gmail.com'} );
      this.dialogVisible = false;
    }
  }
};
</script>
<style>
img.thumbnail {
  height: 100%;
  max-width: 6em;
}
</style>
