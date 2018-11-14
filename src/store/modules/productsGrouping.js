import productsGroupingAPI from '../../api/productsGroupingABS'
import * as types from '../mutation-types'

// initial state
const state = {
    productsGrouping: [],
    productGroupingSelected: {},
}

// actions
const actions = {
    loadAllProductsGrouping( { commit }) {
        productsGroupingAPI.getProducts()
            .then( (datas) => {
                commit(types.PRODUCTS_GROUPING, {
                    datas
                })
            })
    },
    loadProductsGroupingByCategories( { commit }, categories) {
        productsGroupingAPI.getProductsByCategories(categories)
            .then( (datas) => {
                commit(types.PRODUCT_GROUPING, {
                    datas
                })
            })
    },
    selectProductGrouping( { commit }, id) {
        productsGroupingAPI.getProductsById(id)
            .then( (datas) => {
                commit(types.PRODUCT_GROUPING, {
                    datas
                })
            })
    }
}

// mutations
const mutations = {
    [types.PRODUCTS_GROUPING](state, {
        datas
    }) {
        state.productsGrouping = datas
    },
    [types.PRODUCT_GROUPING](state, {
        datas
    }) {
        state.productGroupingSelected = datas
    }    
}

export default {
    state,
    actions,
    mutations
}
