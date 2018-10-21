<template>
  <v-app id="app">
    <!-- left menu -->
    <v-navigation-drawer
      persistent
      :mini-variant="miniVariant"
      :clipped="clipped"
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
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-btn icon @click.stop="miniVariant = !miniVariant">
        <v-icon v-html="miniVariant ? 'chevron_right' : 'chevron_left'"></v-icon>
      </v-btn>
      <v-btn icon @click.stop="clipped = !clipped">
        <v-icon>web</v-icon>
      </v-btn>
      <v-btn icon @click.stop="fixed = !fixed">
        <v-icon>web</v-icon>
      </v-btn>
      <v-toolbar-title v-text="title"></v-toolbar-title>
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
      fixed
      app

      :mini-variant="miniVariant"
      :clipped="clipped"
      enable-resize-watcher

      
    >
      <v-list>
        <!--v-list-tile @click="right = !right">
          <v-list-tile-action>
            <v-icon>compare_arrows</v-icon>
          </v-list-tile-action>
          <v-list-tile-title>Switch drawer (click me)</v-list-tile-title>
        </v-list-tile-->
        
        <router-view name="drawer"></router-view>
        
      </v-list>
    </v-navigation-drawer>
    <!-- footer -->
    <v-footer :fixed="fixed" app>
      <span>&copy; 2018 - Author Benjamin Corré</span>
    </v-footer>
  </v-app>
</template>

<script>
import baseProducts from '../images/base-products.png'

export default {
  name: 'App',
  components: {

  },
  data () {
    return {
      clipped: false,
      drawer: true,
      fixed: false,
      items: [{
        icon: 'fas fa-database',
        title: 'Base produits',
        navigation: '/base-products'
      },
      {
        icon: 'fas fa-shopping-cart',
        title: 'Mes produits',
        navigation: '/my-products'
      }],
      miniVariant: false,
      rightDrawer: false,
      title: 'Vuetify.js'
    }
  },
  methods: {
    changeMenu(navigation) {
      this.$router.push(navigation)
    }
  }
}
</script>
<style>

</style>
