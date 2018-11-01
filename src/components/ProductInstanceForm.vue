<template>
<div class="middle row col-md-12">
 <div class="card col-md-10">
    <div class="card-body">
      <div class="row col-md-12">
         <div class="col-md-2 middle">
          <p-image :url="productInstance.image" class="imageProduct" />
        </div>
         <div class="column col-md-10">
          <h5>
            {{ productInstance.label }}
          </h5>
          <h6>
            {{ productInstance.id }}
          </h6>
          <div class="row col-md-12 right">
             <div class="col-md-7">
             </div>
            <div class="col-md-3">
              <nutriscore :letter="productInstance.nutriscore" class="imageNova"></nutriscore>
            </div>

            <div class="col-md-2">
              <nova :score="productInstance.nova" class="imageNova"></nova>
            </div>
          </div>
        </div>
      </div>
    </div>
 </div>

  <div class="card col-md-10">
    <div class="card-body">
      <h2 class="card-title"> Informations </h2>
      <div class="row">
        <div class="col-md-12">
          <div class="form-group">
            <label for="identifiant">Identifiant</label>
            <input type="Number" v-model="productInstance.id" class="form-control col-sm-6" id="identifiant" disabled placeholder="Id">
          </div>

          <div class="form-group">
            <label for="libelle">Libellé</label>
            <textarea type="String" v-model="productInstance.label" class="form-control" id="libelle" placeholder="Libellé" />
          </div>

          <div class="form-group">
            <label for="unit">Unité</label>
            <select v-model="productInstance.unit" class="form-control col-sm-4" id="unit">
              <option>cl</option>
              <option>kg</option>
              <option>g</option>
              <option>l</option>
              <option>u</option>
            </select>
          </div>

            <div class="form-group">
              <label for="ean">EAN</label>
              <div class="row col-sm-12">
                <input type="Number" v-model="productInstance.openFoodFactId" class="form-control col-sm-6" id="ean" placeholder="32...">
                &nbsp;
                <button type="button" v-on:click="refresh" :disabled="(productInstance.openFoodFactId || '').length == 0" class="btn btn-secondary">Rafraichir</button>
              </div>
            </div>

            <div class="row">
              <div class="form-group col-sm-6">
                <label for="nutriscore">Nutriscore</label>
                <input type="String" v-model="productInstance.nutriscore" class="form-control" id="nutriscore" placeholder="exemple: A">
              </div>

              <div class="form-group col-sm-6">
                <label for="nova">Nova</label>
                <input type="String" v-model="productInstance.nova" class="form-control" id="nova" placeholder="exemple: 1">
              </div>
            </div>

            <div class="form-group">
              <label for="image">Url image</label>
              <input type="String" v-model="productInstance.image" class="form-control" id="image" placeholder="http://...">
            </div>

        </div>

        
      </div>
    </div>
  </div>

  <div v-for="productShop of productInstance.productShops" :key="productShop.id" class="card col-md-10">
    <div class="card-body">
      <img :src="imageCoursesU" class="logo">
      <div class="row">
        <div class="col-md-6">
          <div class="form-group">
            <label for="identifiant">Identifiant</label>
            <input type="Number" v-model="productShop.id" class="form-control col-sm-6" id="identifiant" placeholder="Id">
          </div>

          <div class="form-group">
            <label for="libelle">Libellé</label>
            <textarea type="String" v-model="productShop.label" class="form-control" id="libelle" placeholder="Libellé" />
          </div>
        </div>
        <div class="col-md-6 middle">
          <p-image :url="productShop.url" class="imageProduct" />
        </div>
      </div>
       <div class="form-group">
          <label for="image">Url image</label>
          <input type="String" v-model="productShop.url" class="form-control" id="image" placeholder="http://...">
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

import imgCoursesU from "../../images/coursesu.png";

export default {
  name: "product-instance-form",
  components: {
    Nutriscore,
    Nova,
    PImage
  },
  data() {
    return {
      imageCoursesU: imgCoursesU
    };
  },
  mounted() {
    const id = this.$route.params.id;
    if (id) {
      this.$store.dispatch("selectProductInstance", id);
    }
  },
  computed: {
    ...mapState({
      productInstance: state => state.productInstances.productInstanceSelected
    })
  },
  watch: {
    "$route.params.id"(id) {
      if (id) {
        this.$store.dispatch("selectProductInstance", id);
      }
    }
  },
  methods: {
    refresh() {
      this.$store.dispatch("refreshProductInstance", {
        id: this.productInstance.id,
        openFoodFactId: this.productInstance.openFoodFactId
      });
    },
    update() {
      this.$store.dispatch("updateProductInstance", this.productInstance);
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
  height: 6em;
}
img.imageNova {
  height: 4em;
}
img.logo {
  height: 6em;
}
div.card {
  margin-bottom: 1em;
}
</style>
