import productInstancesAPI from '../../api/productInstancesABS'
import * as types from '../mutation-types'

// initial state
const state = {
    productInstances: []
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

}

// mutations
const mutations = {
    [types.PRODUCT_INSTANCES](state, {
        datas
    }) {
        state.productInstances = datas
    }
}

export default {
    state,
    actions,
    mutations
}
