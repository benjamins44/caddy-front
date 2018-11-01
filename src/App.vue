<template>
  <v-app id="app">
    <!-- left menu -->
    <v-navigation-drawer
      persistent
      :mini-variant="miniVariant"
      clipped
      v-model="drawer"
      enable-resize-watcher
      fixed
      app
    >
     
      <v-list>
        <v-list-tile
          value="true"
          v-for="(item, i) in items"
          :key="i"
          v-on:click="changeMenu(item.navigation)"
        >
          <v-list-tile-action>
            <v-icon v-html="item.icon"></v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

    <!-- Top toolbar -->
    <v-toolbar
      app
      :clipped-left="clipped"
    >
      <v-btn icon @click.stop="miniVariant = !miniVariant">
        <v-icon v-html="miniVariant ? 'chevron_right' : 'chevron_left'"></v-icon>
      </v-btn>
      <v-toolbar-title v-text="title"></v-toolbar-title>

      <el-tooltip content="Calculer les statistiques" placement="bottom">
        <v-btn icon @click="calculateStats()">
          <v-icon  color="primary" dark>fa-calculator</v-icon>
        </v-btn>
      </el-tooltip>

      <el-tooltip content="Préparer la prochaine commande" placement="bottom">
        <v-btn icon @click="preparePreOrder()">
          <v-icon  color="primary" dark>shop</v-icon>
        </v-btn>
      </el-tooltip>
    
      <v-spacer></v-spacer>
      <v-btn icon @click.stop="rightDrawer = !rightDrawer">
        <v-icon>menu</v-icon>
      </v-btn>
    </v-toolbar>

    <!-- Main page -->
    <v-content>
       <router-view></router-view>
    </v-content>


    <!-- Drawer -->
    <v-navigation-drawer
      right
      v-model="rightDrawer"
      app
      :mini-variant="miniVariant"
      clipped
      light
      enable-resize-watcher
    >
      <v-list>     
        <router-view name="drawer"></router-view>
      </v-list>
    </v-navigation-drawer>
    <!-- footer -->
    <v-footer fixed app>
      <span>&copy; 2018 - Auteur Benjamin Corré</span>
    </v-footer>
  </v-app>
</template>

<script>
import baseProducts from "../images/base-products.png";

export default {
  name: "App",
  components: {},
  data() {
    return {
      clipped: false,
      drawer: true,
      fixed: false,
      items: [
        {
          icon: "fas fa-database",
          title: "Base produits",
          navigation: "/base-products"
        },
        {
          icon: "fas fa-utensils",
          title: "Mes produits",
          navigation: "/my-products"
        },
        {
          icon: "fas fa-shopping-basket",
          title: "Mes commandes",
          navigation: "/my-orders"
        },
        {
          icon: "fas fa-chart-line",
          title: "Statistiques",
          navigation: "/stat-products"
        }
      ],
      miniVariant: false,
      rightDrawer: false,
      title: "Mon caddy de courses"
    };
  },
  methods: {
    changeMenu(navigation) {
      this.$router.push(navigation);
    },
    calculateStats() {
      this.$store.dispatch("calculateStats");
    },
    preparePreOrder() {
      this.$store.dispatch("preparePreOrder", "olivia.benjamin.corre@gmail.com");
    },
  },
  mounted() {
    this.$store.dispatch("loadAllProductInstances");
    this.$store.dispatch("loadAllProducts");
    this.$store.dispatch("loadAllOrders", "olivia.benjamin.corre@gmail.com");
  }
};
</script>
<style>
</style>
