import axios from "axios";

const BASE_URL = "http://localhost:8080";

export default {
  // return all preOrders of a customer
  getOrders(customer) {
    const http = axios.create({
      baseURL: BASE_URL
    });

    return http
      .get(`/preorders/${customer}`)
      .then(result => result.data)
      .catch(err => {
        return err;
      });
  },
  // return a order by id of a customer
  getOrdersById(customer, id) {
    const http = axios.create({
      baseURL: BASE_URL
    });

    return http
    .get(`/preorders/${customer}/${id}`)
      .then(result => result.data)
      .catch(err => {
        return err;
      });
  },
  // return all preOrders of a customer
  prepareOrder(customer) {
    const http = axios.create({
      baseURL: BASE_URL
    });

    return http
      .get(`/preorders/${customer}/prepare`)
      .then(result => result.data)
      .catch(err => {
        return err;
      });
  },

};
