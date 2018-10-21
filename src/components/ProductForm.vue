<template>
<div class="middle row col-md-12">
  <div class="card col-md-8">
    <div class="card-body">
      <h2 class="card-title"> Informations </h2>
      <div class="row">
        <div class="col-md-6">
          <div class="form-group">
            <label for="indentifiant">Identifiant</label>
            <input type="Number" v-model="product.id" class="form-control col-sm-6" id="indentifiant" disabled placeholder="Id">
          </div>

          <div class="form-group">
            <label for="libelle">Libellé</label>
            <textarea type="String" v-model="product.label" class="form-control" id="libelle" placeholder="Libellé" />
          </div>

        

        </div>

     
      </div>
    </div>
  </div>
   
  <div class="form-group">
    <button type="button" v-on:click="update" class="btn btn-primary">Mettre à jour</button>
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
     
    };
  },
  computed: {
    ...mapState({
      product: state => state.products.productSelected
    })
  },
  methods: {
    update() {
      this.$store.dispatch('udpateProductInstance', this.product )
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

img.imageProduct {
  height: 10em;
}
.imageNova {
  height: 8em;
}
img.logo {
  height: 6em;
}
div.card {
  margin-bottom: 1em
}
</style>
