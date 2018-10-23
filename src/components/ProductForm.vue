<template>
  <div class="middle row col-md-12">
    <div class="card col-md-10">
      <div class="card-body">
        <div class="row col-md-12">
          <div class="col-md-2 middle">
          
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
          >
        </el-table-column>
        <el-table-column
          prop="label"
          label="Libellé"
          >
        </el-table-column>
        <el-table-column
          prop="priority"
          label="Priorité"
          >
        </el-table-column>
      </el-table>
    </div>
  </div>

  <div class="card col-md-10">
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

  <div class="card col-md-10">
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
  name: "product-form",
  components: {
    Nutriscore,
    Nova
  },
  data() {
    return {
      activeName: "day"
    };
  },
  computed: {
    ...mapState({
      product: state => state.products.productSelected
    })
  },
  methods: {
    update() {
      this.$store.dispatch("udpateProductInstance", this.product);
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
</style>
