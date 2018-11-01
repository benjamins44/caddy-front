<template>
  <div class="middle row col-md-12">
    <div class="card col-md-10">
      <div class="card-body">
        <div class="row col-md-12">
          <div class="col-md-2 middle">
           <p-image :url="product.image" class="imageProduct" />
          </div>
          <div class="column col-md-10">
            <h5>
              {{ product.label }}
            </h5>
            <h6>
              {{ product.id }}
            </h6>
          </div>
        </div>
      </div>
  </div>

  <div class="card col-md-10">
    <div class="card-body">
      <h2 class="card-title"> Informations </h2>
      <div class="form-group">
        <label for="indentifiant">Identifiant</label>
        <input type="Number" v-model="product.id" class="form-control col-sm-6" id="indentifiant" disabled placeholder="Id">
      </div>

      <div class="form-group">
        <label for="libelle">Libellé</label>
        <textarea type="String" v-model="product.label" class="form-control" id="libelle" placeholder="Libellé" />
      </div>

      <div class="form-group">
        <label for="statut">Statut</label>
        <select v-model="product.status" class="form-control col-sm-4" id="statut">
          <option value="TO_COMPLETED">A compléter</option>
          <option value="USED">Utilisé</option>
          <option value="ABANDONNED">Abandonné</option>
        </select>
      </div>
    </div>
    <div class="middle">
      <button type="button" v-on:click="update" class="btn btn-primary">Mettre à jour</button>
    </div>
  </div>

  <div class="card col-md-10">
    <div class="card-body">
      <h2 class="card-title"> Instances </h2>
      <el-table
        :data="product.productInstances"
        :default-sort = "{prop: 'priority', order: 'ascending'}"
        style="width: 100%">
        <el-table-column
          prop="id"
          label="Id"
          width="100"
          >
        </el-table-column>
        <el-table-column
          label="Libellé"
        >
          <template slot-scope="scope">
            <div class="row col-md-12">
              <p-image class="col-md-2 thumbnail" :url="scope.row.image"  />
              <div class="col-md-10">{{ scope.row.label }}</div>
            </div>
          </template>  
        </el-table-column>
        <el-table-column
          prop="priority"
          label="Priorité"
          width="100"
          >
        </el-table-column>
        <el-table-column
          fixed="right"
          label="Operations"
          width="100"
          >
          <template slot-scope="scope">
            <v-btn color="red" @click="removeProductInstance(scope.$index, scope.row)" dark>
             <v-icon  dark>remove</v-icon>
           </v-btn>
          </template>
        </el-table-column>
      </el-table>
      <hr/>
      <div class="row col-sm-12">
        <div class="form-group col-sm-9">
          <label for="instance">Instance de produit</label>
          <product-instance-select name="instance" v-model="productInstanceSelected" />
        </div>
        <div class="form-group col-sm-3">
          <label for="priority">Priorité</label>
          <input type="Number" v-model="productInstanceSelected.priority" class="form-control" id="priority" placeholder="Priorité">
        </div>
      </div>
      <div class="middle">
      <button type="button" v-on:click="addProductInstance" class="btn btn-primary">Ajouter</button>
    </div>
    </div>
  </div>

  <div class="card col-md-10" v-if="product.consumption">
    <div class="card-body">
      <h2 class="card-title"> Historique </h2>
       <el-tabs v-model="activeName">
        <el-tab-pane label="Par jour" name="day">
          <el-table
            :data="product.consumption.dayQuantity"
            :default-sort = "{prop: 'day', order: 'ascending'}"
            style="width: 100%">
            <el-table-column
              prop="day"
              label="Jour"
              >
            </el-table-column>
            <el-table-column
              prop="quantity"
              label="Quantité"
              >
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="Par semaine" name="week">
          <el-table
            :data="product.consumption.weeklyQuantity"
            :default-sort = "{prop: 'year,week', order: 'ascending, ascending'}"
            style="width: 100%">
            <el-table-column
              prop="year"
              label="Année"
              >
            </el-table-column>
             <el-table-column
              prop="week"
              label="Semaine"
              >
            </el-table-column>
            <el-table-column
              prop="quantity"
              label="Quantité"
              >
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
      
    </div>
  </div>

  <div class="card col-md-10" v-if="product.consumption">
    <div class="card-body">
      <h2 class="card-title"> Statistiques </h2>
      <div class="form-group">
        <label>Nombre de semaines du dernier achat</label>&nbsp;
        <el-tag type="info">{{ product.consumption.nbWeekOfLastBuy }}</el-tag>
      </div>
      <div class="form-group">
        <label>Probabilité d'achat à la prochaine commande</label>&nbsp;
        <el-tag type="info">{{ product.consumption.probalilityBuy * 100 }}%</el-tag>
      </div>
      <div class="form-group">
        <label>Probabilité de la quantité commandée </label>&nbsp;
        <el-tag type="info">{{ product.consumption.probalilityQuantityBuy }}</el-tag>
      </div>

      <div class="form-group">
        <label>Moyennes d'achat</label>&nbsp;
        <el-table
          :data="product.consumption.averages"
          :default-sort = "{prop: 'nbOccurences', order: 'ascending'}"
          style="width: 100%">
          <el-table-column
            prop="nbOccurences"
            label="Nombre d'occurences"
            >
          </el-table-column>
          <el-table-column
            prop="nbWeek"
            label="Nombre de semaines"
            >
          </el-table-column>
          <el-table-column
            prop="quantity"
            label="Quantité"
            >
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
import ProductInstanceSelect from "./ProductInstanceSelect";

export default {
  name: "product-form",
  components: {
    PImage,
    Nutriscore,
    Nova,
    ProductInstanceSelect
  },
  data() {
    return {
      activeName: "day",
      productInstanceSelected: {}
    };
  },
  mounted() {
    const id = this.$route.params.id;
    if (id) {
      this.$store.dispatch("selectProduct", id);
    }
  },
  computed: {
    ...mapState({
      product: state => state.products.productSelected
    })
  },
  watch: {
    "$route.params.id"(id) {
      if (id) {
        this.$store.dispatch("selectProduct", id);
      }
    }
  },
  methods: {
    update() {
      this.$store.dispatch("updateProduct", this.product);
    },
    addProductInstance() {
      this.product.productInstances.push(this.productInstanceSelected);
      this.productInstanceSelected = {};
    },
    removeProductInstance(index, row) {
      this.product.productInstances.splice(index, 1);
    }
  }
};
</script>
<style>
.middle {
  padding: 1em;
  display: flex;
  align-items: center;
  flex-direction: column;
}

img.logo {
  height: 6em;
}
div.card {
  margin-bottom: 1em;
}
img.thumbnail {
  height: 100%;
  max-width: 6em;
}
</style>
