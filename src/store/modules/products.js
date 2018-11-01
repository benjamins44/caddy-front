import productsAPI from '../../api/productsABS'
import * as types from '../mutation-types'
import { Message } from 'element-ui';

// initial state
const state = {
    products: [],
    productSelected: {},
}

// actions
const actions = {
    loadAllProducts( { commit }) {
        productsAPI.getProducts()
            .then( (datas) => {
                commit(types.PRODUCTS, {
                    datas
                })
            })
    },
    loadAllProductsByLabel( { commit }, label) {
        productsAPI.getProductsByLabel(label)
            .then( (datas) => {
                commit(types.PRODUCTS, {
                    datas
                })
            })
    },
    selectProduct( { commit }, id) {
        productsAPI.getProductsById(id)
            .then( (datas) => {
                commit(types.PRODUCT, {
                    datas
                })
            })
    },
    updateProduct( { commit },  product  ) {
        productsAPI.updateProducts(product)
            .then( (datas) => {
                commit(types.PRODUCT, {
                    datas
                });
                this.dispatch('loadAllProducts');
                Message({
                    message: 'Le produit a été mis à jour.',
                    type: 'info'
                });
            })
    },
    calculateStats( { commit }) {
        productsAPI.calculateStats()
            .then( (datas) => {
                commit(types.PRODUCTS, {
                    datas
                });
                this.dispatch('loadAllProducts');
                Message({
                    message: 'Le calcul des statistiques est terminé.',
                    type: 'success'
                });
            })
    },
}

// mutations
const mutations = {
    [types.PRODUCTS](state, {
        datas
    }) {
        state.products = datas
    },
    [types.PRODUCT](state, {
        datas
    }) {
        state.productSelected = datas
    }    
}

export default {
    state,
    actions,
    mutations
}
