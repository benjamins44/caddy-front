import axios from "axios";

const BASE_URL = "http://localhost:8080";

export default {
  // return all orders of a customer
  getOrders(customer) {
    const http = axios.create({
      baseURL: BASE_URL
    });

    return http
      .get(`/orders/${customer}`)
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
    .get(`/orders/${customer}/${id}`)
      .then(result => result.data)
      .catch(err => {
        return err;
      });
  },

};
