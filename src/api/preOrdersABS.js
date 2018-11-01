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
  // prepare preOrder
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
  // order preOrder
  orderPreOrder(preOrder) {
    const http = axios.create({
      baseURL: BASE_URL
    });

    return http
      .get(`/preorders/${preOrder.id}/order`)
      .then(result => result.data)
      .catch(err => {
        return err;
      });
  },
  // update products instance by id
  updatePreOrder(preOrder) {
    const http = axios.create({
      baseURL: BASE_URL
    });

    return http
      .put(`/preorders/${preOrder.id}`, preOrder)
      .then(result => result.data)
      .catch(err => {
        return err;
      });
  },
  getLastPreOrder(customer) {
    const http = axios.create({
      baseURL: BASE_URL
    });

    return http
      .get(`/preorders/${customer}/last`)
      .then(result => result.data)
      .catch(err => {
        return err;
      });
  }

};
