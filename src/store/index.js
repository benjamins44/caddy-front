import Vue from 'vue'
import Vuex from 'vuex'
import productInstances from './modules/productInstances'
import products from './modules/products'
import orders from './modules/orders'
import preOrders from './modules/preOrders'
import productsGrouping from './modules/productsGrouping'

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        productInstances,
        products,
        orders,
        preOrders,
        productsGrouping
    }
})

export default store
