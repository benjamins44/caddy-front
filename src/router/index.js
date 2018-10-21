import Vue from 'vue'
import Router from 'vue-router'
import ProductInstanceForm from '../components/ProductInstanceForm'
import ProductInstancesTable from '../components/ProductInstancesTable'
import ProductForm from '../components/ProductForm'
import ProductsTable from '../components/ProductsTable'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/base-products',
            components: {
                default: ProductInstanceForm,
                drawer: ProductInstancesTable
            }
        },
        {
            path: '/my-products',
            components: {
                default: ProductForm,
                drawer: ProductsTable
            }
        }
    ]
})
