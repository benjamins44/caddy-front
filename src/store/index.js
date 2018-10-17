import Vue from 'vue'
import Vuex from 'vuex'
import productInstances from './modules/productInstances'

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        productInstances
    }
})

export default store
