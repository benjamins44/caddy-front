import preOrdersAPI from '../../api/preOrdersABS'
import * as types from '../mutation-types'
import { Message } from 'element-ui';

// initial state
const state = {
    preOrders: [],
    preOrderSelected: {},
}

// actions
const actions = {
    loadAllPreOrders( { commit }, customer) {
        preOrdersAPI.getOrders(customer)
            .then( (datas) => {
                commit(types.ORDERS, {
                    datas
                })
            })
    },
    selectPreOrder( { commit }, { customer, id } ) {
        preOrdersAPI.getOrdersById(customer, id)
            .then( (datas) => {
                commit(types.ORDER, {
                    datas
                })
            })
    },
    updatePreOrder( { commit },  order  ) {
        preOrdersAPI.updateOrders(order)
            .then( (datas) => {
                commit(types.ORDER, {
                    datas
                });
                this.dispatch('loadAllPreOrders');
            })
    },
    preparePreOrder( { commit }, customer ) {
        preOrdersAPI.prepareOrder(customer)
            .then( (datas) => {
                commit(types.ORDER, {
                    datas
                });
                this.dispatch('loadAllPreOrders');
                Message({
                    message: 'Le précommande a été faite.',
                    type: 'info'
                });
            })
    }
}

// mutations
const mutations = {
    [types.PRE_ORDERS](state, {
        datas
    }) {
        state.preOrders = datas
    },
    [types.PRE_ORDER](state, {
        datas
    }) {
        state.preOrderSelected = datas
    }    
}

export default {
    state,
    actions,
    mutations
}
