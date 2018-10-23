import axios from 'axios'

const BASE_URL = 'http://localhost:8080'

export default {
    // return all products instance
    getProductInstances() {
        const http = axios.create({
            baseURL: BASE_URL
        })

        return http.get('/productInstances').then(result =>
            result.data
        ).catch(err => {
            return err
        })
    },
    // return all products instance
    getProductInstancesByLabel(label) {
        const http = axios.create({
            baseURL: BASE_URL
        })

        return http.get(`/productInstances/query?label=${label}`).then(result =>
            result.data
        ).catch(err => {
            return err
        })
    },
    // return products instance by id
    getProductInstancesById(id) {
        const http = axios.create({
            baseURL: BASE_URL
        })

        return http.get(`/productInstances/${id}`).then(result =>
            result.data
        ).catch(err => {
            return err
        })
    },
    // refresh and return products instance by id
    getRefreshProductInstancesById(id, openFoodFactId) {
        const http = axios.create({
            baseURL: BASE_URL
        })

        return http.get(`/productInstances/${id}/query?refresh=true&ean=${openFoodFactId}`).then(result =>
            result.data
        ).catch(err => {
            return err
        })
    },
    // update products instance by id
    updateProductInstances(productInstance) {
        const http = axios.create({
            baseURL: BASE_URL
        })

        return http.put(`/productInstances/${productInstance.id}`, productInstance).then(result =>
            result.data
        ).catch(err => {
            return err
        })
    },
}
