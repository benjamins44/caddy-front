import axios from 'axios'

export default {
    // return all products instance
    getProductInstances() {
        const http = axios.create({
            baseURL: 'http://localhost:8080'
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
            baseURL: 'http://localhost:8080'
        })

        return http.get(`/productInstances/query?label=${label}`).then(result =>
            result.data
        ).catch(err => {
            return err
        })
    },
}
