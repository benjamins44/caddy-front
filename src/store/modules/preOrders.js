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
    getLastPreOrder( { commit }, customer) {
        preOrdersAPI.getLastPreOrder(customer)
            .then( (datas) => {
                commit(types.PRE_ORDER, {
                    datas
                })
            })
    },
    selectPreOrder( { commit }, { customer, id } ) {
        preOrdersAPI.getOrdersById(customer, id)
            .then( (datas) => {
                commit(types.PRE_ORDER, {
                    datas
                })
            })
    },
    updatePreOrder( { commit },  { preOrder, customer } ) {
        preOrdersAPI.updatePreOrder(preOrder)
            .then( (datas) => {
                commit(types.PRE_ORDER, {
                    datas
                });
                this.dispatch('getLastPreOrder', customer);
                Message({
                    message: 'Le panier a été mise à jour.',
                    type: 'info'
                });
            })
    },
    orderPreOrder( { commit },  { preOrder, customer } ) {
        preOrdersAPI.orderPreOrder(preOrder)
            .then( (datas) => {
                commit(types.PRE_ORDER, {
                    datas
                });
                this.dispatch('getLastPreOrder', customer);
                Message({
                    message: 'La panier a été compléter sur www.coursesu.com',
                    type: 'success'
                });
            })
    },
    preparePreOrder( { commit }, customer ) {
        preOrdersAPI.prepareOrder(customer)
            .then( (datas) => {
                commit(types.PRE_ORDER, {
                    datas
                });
                this.dispatch('getLastPreOrder', customer);
                Message({
                    message: 'Le panier a été faite.',
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
