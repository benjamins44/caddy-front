import productInstancesAPI from '../../api/productInstancesABS'
import * as types from '../mutation-types'

// initial state
const state = {
    productInstances: [],
    productInstanceSelected: {},
}

// actions
const actions = {
    loadAllProductInstances( { commit }) {
        productInstancesAPI.getProductInstances()
            .then( (datas) => {
                commit(types.PRODUCT_INSTANCES, {
                    datas
                })
            })
    },
    loadAllProductInstancesByLabel( { commit }, label) {
        productInstancesAPI.getProductInstancesByLabel(label)
            .then( (datas) => {
                commit(types.PRODUCT_INSTANCES, {
                    datas
                })
            })
    },
    selectProductInstance( { commit }, id) {
        productInstancesAPI.getProductInstancesById(id)
            .then( (datas) => {
                commit(types.PRODUCT_INSTANCE, {
                    datas
                })
            })
    },
    refreshProductInstance( { commit }, { id, openFoodFactId } ) {
        productInstancesAPI.getRefreshProductInstancesById(id, openFoodFactId)
            .then( (datas) => {
                commit(types.PRODUCT_INSTANCE, {
                    datas
                });
                dispatchEvent('loadAllProductInstances');
            })
    },
    udpateProductInstance( { commit },  productInstance  ) {
        productInstancesAPI.updateProductInstances(productInstance)
            .then( (datas) => {
                commit(types.PRODUCT_INSTANCE, {
                    datas
                });
                this.dispatch('loadAllProductInstances');
            })
    },

}

// mutations
const mutations = {
    [types.PRODUCT_INSTANCES](state, {
        datas
    }) {
        state.productInstances = datas
    },
    [types.PRODUCT_INSTANCE](state, {
        datas
    }) {
        state.productInstanceSelected = datas
    }    
}

export default {
    state,
    actions,
    mutations
}
