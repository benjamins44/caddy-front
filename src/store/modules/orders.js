import ordersAPI from '../../api/ordersABS'
import * as types from '../mutation-types'

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
        ordersAPI.updateOrders(order)
            .then( (datas) => {
                commit(types.ORDER, {
                    datas
                });
                this.dispatch('loadAllorders');
            })
    }
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
