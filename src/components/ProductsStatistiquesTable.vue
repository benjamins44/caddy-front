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
      <h2 class="card-title"> Statistiques </h2>
      <el-table
        ref="items"
        :data="this.products"
        :default-sort = "{prop: 'consumption.probalilityBuy', order: 'descending'}"
        :row-class-name="tableRowClassName"
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
          label="Probabilité"
          prop="consumption.probalilityBuy"
          >
          <template slot-scope="scope">
          <el-progress :text-inside="true" :color="getStatus(scope.row.consumption.probalilityBuy)" :stroke-width="18" :percentage="getPercent(scope.row.consumption.probalilityBuy)"></el-progress>
          </template>  
        </el-table-column>
        <el-table-column
            label="Quantité"
            width="80"
            prop="consumption.probalilityQuantityBuy"
            >
        </el-table-column>
       <el-table-column
            label="Nb semaines dernier achat"
            width="80"
            prop="consumption.nbWeekOfLastBuy"
            >
        </el-table-column>
         <el-table-column
          fixed="right"
          width="100"
          >
          <template slot-scope="scope">
            <el-tooltip content="Ne plus proposer" placement="bottom" v-if="scope.row.orderStatus !== 'ABANDONNED'">
              <v-icon @click="abandonProduct(scope.$index, scope.row)" class="trash">fa-ban</v-icon>
            </el-tooltip>
            <el-tooltip content="Reproposer" placement="bottom" v-if="scope.row.orderStatus === 'ABANDONNED'">
              <v-icon @click="enableProduct(scope.$index, scope.row)" class="trash">fa-thumbs-up</v-icon>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
  </div>
  
</template>


<script>
import { mapState } from "vuex";
import PImage from "./PImage";

export default {
  name: "products-statistiques-table",
  components: {
    PImage,
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
    getPercent(percent) {
      if (percent < 0) {
        percent = 0;
      }
      return parseInt(percent * 100);
    },
    getStatus(percent) {
      if (percent < 0) {
        return '';
      }
      if (percent < 0.3) {
        return 'rgba(245, 108, 108, 0.7)';
      }
      if (percent >= 0.3 && percent < 0.75) {
        return 'rgba(142, 113, 199, 0.7)';
      }

      if (percent < 0.9) {
        return 'orange';
      }
      return 'rgba(103, 194, 58, 0.7)';
    },
    selectproduct(product) {
      const navigation = `/my-products/${product.id}`;
      this.$router.push(navigation);
    },
    tableRowClassName({row, rowIndex}) {
      if (row.orderStatus === 'NO_LONGER_PROPOSED') {
        return 'warning-row';
      } else if (row.orderStatus === 'ABANDONNED') {
        return 'abandonned-row';
      } else if (row.orderStatus === 'TO_ORDER') {
        return 'success-row';
      } else if (row.orderStatus === 'NOT_ENOUGH_ORDERED') {
        return 'not-enough-ordered-row';
      }
      
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
  div > i.fa-trash.fa {
    
  }
</style>