<template>
  <div class="middle row col-md-12">

  <el-dialog
        title="Confirmaton"
        :visible.sync="dialogReplaceVisible"
        width="30%"
      >
      <span>Souhaitez-vous vraiment utiliser ce produit lors des prochaines commandes à la place de l'actuel ?</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogReplaceVisible = false">Annuler</el-button>
        <el-button type="primary" @click="confirmReplaceProduct()">Confirmer</el-button>
      </span>
    </el-dialog>

    <div class="card col-md-10">
      <div class="card-body">
        <div class="row col-md-12">
          <div class="col-md-2 middle" style="cursor: pointer;" @click="selectProductInstance(product.favorite)">
           <p-image v-if="product.favorite != undefined" :url="product.favorite.image" class="imageProduct" />
          </div>
          <div class="column col-md-6">
            <h5 v-if="product.favorite != undefined">
              {{ product.favorite.label }}
            </h5>
            <h6>
              {{ product.id }}
            </h6>
            <additives-resume v-if="product.favorite != undefined" :additives="product.favorite.additives"></additives-resume>
          </div>
          <div class="column col-md-4">
            <div class="row col-md-12 right">
              <div class="col-md-7">
                <nutriscore v-if="product.favorite != undefined" :letter="product.favorite.nutriscore" class="imageNova"></nutriscore>
              </div>

              <div class="col-md-5">
                <nova v-if="product.favorite != undefined" :score="product.favorite.nova" class="imageNova"></nova>
              </div>
            </div>
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
        <textarea v-if="product.favorite != undefined" type="String" v-model="product.favorite.label" class="form-control" id="libelle" placeholder="Libellé" />
      </div>

      <div class="form-group">
        <label for="statut">Statut</label>
        <select v-model="product.status" class="form-control col-sm-4" id="statut">
          <option value="TO_COMPLETED">A compléter</option>
          <option value="USED">Utilisé</option>
          <option value="ABANDONNED">Abandonné</option>
        </select>
      </div>
     <div class="form-group">
        <label for="ingredients">Liste d'ingrédients</label>
        <ingredients-list v-if="product.favorite != undefined" id="ingredients" :ingredientsList="product.favorite.ingredientsList"></ingredients-list>
    </div>

      <div class="form-group">
        <label for="addtitives">Additifs</label>
          <el-table v-if="product.favorite != undefined"
            empty-text="non indiqué"
          :data="getAllAdditives(product.favorite.additives)"
          :row-class-name="additiveRowClassName"
          :default-sort = "{prop: 'riskLevel', order: 'ascending'}"
          style="width: 100%">
          <el-table-column
            prop="code"
            label="Code"
            >
          </el-table-column>
          <el-table-column
            prop="label"
            label="Libellé"
            >
          </el-table-column>
          <el-table-column
            prop="risks"
            label="Risques"
            >
          </el-table-column>
        </el-table>
      </div>
    </div>

    <div class="middle">
      <button type="button" v-on:click="update" class="btn btn-primary">Mettre à jour</button>
    </div>
  </div>

  <div class="card col-md-10">
    <div class="card-body">
      <h2 class="card-title"> Produits de substitutions </h2>
      <el-table
        :data="product.substitutes"
        empty-text="Aucune subsitition"
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
            <el-tooltip content="Supprimer" placement="bottom">
              <v-btn color="red" @click="removeProductInstance(scope.$index, scope.row)" dark>
                <v-icon  dark>remove</v-icon>
              </v-btn>
            </el-tooltip>
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
        <button type="button" v-on:click="addSubstitutes" class="btn btn-primary">Ajouter</button>
      </div>
    </div>
  </div>

  <div class="card col-md-10">
    <div class="card-body">
      <h2 class="card-title"> Meilleurs alternatives </h2>
      <el-table 
        :data="product.bestSubstitutes"
        empty-text="Pas d'alternative connue"
        :default-sort = "{prop: 'foodScore.total', order: 'ascending'}"
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
            <div class="row col-md-12" style="cursor: pointer;" @click="selectProductInstance(scope.row)">
              <p-image class="col-md-2 thumbnail" :url="scope.row.image"  />
              <div class="col-md-10">{{ scope.row.label }}</div>
            </div>
          </template>  
        </el-table-column>
        <el-table-column
          label="Additifs"
          width="240">
          <template slot-scope="scope">
            <additives-resume :additives="scope.row.additives"></additives-resume>
          </template>
        </el-table-column>
        <el-table-column 
          label="Nutriscore"
          width="160">
          <template slot-scope="scope">
            <nutriscore :letter="scope.row.nutriscore" class="imageNova"></nutriscore>
          </template>
        </el-table-column>
        <el-table-column
          label="Nova"
          width="80">
          <template slot-scope="scope">
             <nova :score="scope.row.nova" class="imageNova"></nova>
          </template>
        </el-table-column>
        <el-table-column
          prop="foodScore.total"
          fixed="right"
          label="Operations"
          width="100"
          >
          <template slot-scope="scope">
            <el-tooltip content="Remplacer par ce produit" placement="bottom">
              <v-btn v-if="scope.row.id !== product.favorite.id" color="blue" @click="replaceFavorite(scope.$index, scope.row)" dark>
                <v-icon  dark>fa-exchange-alt</v-icon>
              </v-btn>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>


  <div class="card col-md-10">
    <div class="card-body">
      <h2 class="card-title"> Anciens produits </h2>
      <el-table
        :data="product.histories"
        empty-text="Pas d'ancien produit"
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
      </el-table>
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
import AdditivesResume from "./AdditivesResume";
import IngredientsList from "./IngredientsList";

export default {
  name: "product-form",
  components: {
    PImage,
    Nutriscore,
    Nova,
    ProductInstanceSelect,
    AdditivesResume,
    IngredientsList
  },
  data() {
    return {
      activeName: "day",
      productInstanceSelected: {},
      dialogReplaceVisible: false,
      currentReplace:{},
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
      product: state => state.products.productSelected,
    })
  },
  watch: {
    "$route.params.id"(id) {
      if (id) {
        this.$store.dispatch("selectProduct", id);
      }
    },
  },
  methods: {
    update() {
      this.$store.dispatch("updateProduct", this.product);
    },
    addSubstitutes() {
      this.product.substitutes.push(this.productInstanceSelected);
      this.productInstanceSelected = {};
    },
    replaceFavorite(index, product) {
      this.currentReplace = product;
      this.dialogReplaceVisible = true;
    },
    confirmReplaceProduct() {
      this.$store.dispatch("updateProductFavorite", { product: this.product, favorite: this.currentReplace });
      this.dialogReplaceVisible = false;
    },
    removeProductInstance(index, row) {
      this.product.substitutes.splice(index, 1);
    },
    getAllAdditives(additives) {
      if (!additives) {
        return;
      }
      let result = [];
      for (let grpAdditive of additives) {
        for (let additive of grpAdditive.additives) {
          result.push(additive);
        }
      }
      return result;
    },
    additiveRowClassName({row, rowIndex}) {
      switch(row.riskLevel) {
        case 1: return 'success-row';
        case 2: return 'low-warning-row';
        case 3: return 'middle-warning-row';
        case 4: return 'warning-row';
        case 5: return 'high-warning-row';
      }
      return 'success-row';
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
