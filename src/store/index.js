import Vue from 'vue'
import Vuex from 'vuex'
import productInstances from './modules/productInstances'
import products from './modules/products'

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        productInstances,
        products
    }
})

export default store
