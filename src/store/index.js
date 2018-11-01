import Vue from 'vue'
import Vuex from 'vuex'
import productInstances from './modules/productInstances'
import products from './modules/products'
import orders from './modules/orders'

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        productInstances,
        products,
        orders
    }
})

export default store
