<template>
  <div class="middle">
    <el-dialog
      title="Confirmaton"
      :visible.sync="dialogAbandonVisible"
      width="30%"
    >
    <span>Souhaitez-vous vraiment abandonner l'utilisation de ce produit ?</span>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogAbandonVisible = false">Annuler</el-button>
      <el-button type="primary" @click="confirmAbandonProduct()">Confirmer</el-button>
    </span>
  </el-dialog>

  <div class="card col-md-10">
    <div class="card-body">
      <h2 class="card-title"> Produits </h2>
      <el-table
        ref="items"
        :data="this.products"
        :default-sort = "{prop: 'favorite.foodScore.total', order: 'descending'}"
        :row-class-name="tableRowClassName"
        style="width: 100%">
         <el-table-column
          type="index"
          width="50">
        </el-table-column>
        <el-table-column
          label="Produit"
          prop="favorite.foodScore.total"
          >
          <template slot-scope="scope">
            <div class="row col-md-12 cell-select" @click="selectproduct(scope.row)">
              <p-image class="col-md-2 thumbnail" :url="scope.row.favorite.image"  />
              <div class="col-md-9">{{ scope.row.favorite.label }}</div>
            </div>
            <div class="middle">
              <div class="row">
                <additives-resume  :additives="scope.row.favorite.additives"></additives-resume>
              </div>
              <div class="row">
                <nutriscore :letter="scope.row.favorite.nutriscore" class="imageNova"></nutriscore>
                <nova :score="scope.row.favorite.nova" class="imageNova"></nova>
              </div>
            </div>
          </template>  
        </el-table-column>
        <el-table-column
          label="Proposition"
          >
          <template slot-scope="scope">
            <el-carousel height="25em" indicator-position="none" :autoplay="false" v-if="scope.row.bestSubstitutes.length > 0">
              <el-carousel-item v-for="substitute in scope.row.bestSubstitutes" :key="substitute">
                <div class="row col-md-12 cell-select" @click="selectproduct(substitute)">
                  <p-image class="col-md-2 thumbnail" :url="substitute.image"  />
                  <div class="col-md-9">{{ substitute.label }}</div>
                </div>
                <div class="middle">
                  <div class="row">
                    <additives-resume  :additives="substitute.additives"></additives-resume>
                  </div>
                  <div class="row">
                    <nutriscore :letter="substitute.nutriscore" class="imageNova"></nutriscore>
                    <nova :score="substitute.nova" class="imageNova"></nova>
                  </div>
                </div>
              </el-carousel-item>
            </el-carousel>
          </template>  
        </el-table-column>

         <el-table-column
          fixed="right"
          width="100"
          >
          <template slot-scope="scope">
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
  </div>
  
</template>


<script>
import { mapState } from "vuex";
import Nutriscore from "./Nutriscore";
import Nova from "./Nova";
import PImage from "./PImage";
import AdditivesResume from "./AdditivesResume";

export default {
  name: "products-better-eat-table",
  components: {
    PImage,
    Nutriscore,
    Nova,
    AdditivesResume
  },
  data() {
    return {
       dialogAbandonVisible: false,
       currentProduct:{},
    };
  },
  computed: {
    ...mapState({
      products: state => state.products.products
    }),
  },
  methods: {
    
    selectproduct(product) {
      const navigation = `/my-products/${product.id}`;
      this.$router.push(navigation);
    },
    tableRowClassName({row, rowIndex}) {
      /*
      if (row.orderStatus === 'NO_LONGER_PROPOSED') {
        return 'warning-row';
      } else if (row.orderStatus === 'ABANDONNED') {
        return 'abandonned-row';
      } else if (row.orderStatus === 'TO_ORDER') {
        return 'success-row';
      } else if (row.orderStatus === 'NOT_ENOUGH_ORDERED') {
        return 'not-enough-ordered-row';
      }*/
      
      return '';
    },
    abandonProduct(index, product) {
      this.currentProduct = product;
      this.dialogAbandonVisible = true;
    },
    confirmAbandonProduct() {
      this.currentProduct.status = 'ABANDONNED';
      this.$store.dispatch("updateProduct", this.currentProduct);
      this.dialogAbandonVisible = false;
    },
    enableProduct(index, product) {
      product.status = 'USED';
      this.$store.dispatch("updateProduct", product);
    }
  }
};
</script>
<style>
  img.thumbnail {
    height: 100%;
    max-width: 6em;
  }
 .el-table .warning-row {
    background: oldlace;
  }
  .el-table .abandonned-row {
    opacity: 0.5;
  }
  .el-table .not-enough-ordered-row {
    opacity: 0.8;
    background: #dddddd;
  }
  .el-table .success-row {
    background: #f0f9eb;
  }
  .cell-select {
    cursor: pointer;
  }

</style>