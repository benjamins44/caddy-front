import ordersAPI from '../../api/ordersABS'
import * as types from '../mutation-types'
import { Message } from 'element-ui';

// initial state
const state = {
    orders: [],
    orderSelected: {},
}

// actions
const actions = {
    loadAllOrders( { commit }, customer) {
        ordersAPI.getOrders(customer)
            .then( (datas) => {
                commit(types.ORDERS, {
                    datas
                })
            })
    },
    selectOrder( { commit }, { customer, id } ) {
        ordersAPI.getOrdersById(customer, id)
            .then( (datas) => {
                commit(types.ORDER, {
                    datas
                })
            })
    },
    updateOrder( { commit },  order  ) {
        ordersAPI.updateOrder(order)
            .then( (datas) => {
                commit(types.ORDER, {
                    datas
                });
                this.dispatch('loadAllOrders');
            })
    },
    extractNewOrders( { commit } ) {
        ordersAPI.extractNewOrders()
            .then( (datas) => {
                commit(types.ORDERS, {
                    datas
                });
                this.dispatch('loadAllOrders');
                Message({
                    message: 'Les nouvelles commandes ont été extraites.',
                    type: 'info'
                });
            })
    },

}

// mutations
const mutations = {
    [types.ORDERS](state, {
        datas
    }) {
        state.orders = datas
    },
    [types.ORDER](state, {
        datas
    }) {
        state.orderSelected = datas
    }    
}

export default {
    state,
    actions,
    mutations
}
