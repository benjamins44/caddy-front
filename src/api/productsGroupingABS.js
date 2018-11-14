import axios from "axios";

const BASE_URL = "http://localhost:8080";

export default {
  // return all products instance
  getProducts() {
    const http = axios.create({
      baseURL: BASE_URL
    });

    return http
      .get("/productsgrouping")
      .then(result => result.data)
      .catch(err => {
        return err;
      });
  },
  // return all products instance
  getProductsByCategories(categories) {
    const http = axios.create({
      baseURL: BASE_URL
    });

    return http
      .get(`/productsgrouping/query?categories=${categories}`)
      .then(result => result.data)
      .catch(err => {
        return err;
      });
  },
  // return products instance by id
  getProductsById(id) {
    const http = axios.create({
      baseURL: BASE_URL
    });

    return http
      .get(`/productsgrouping/${id}`)
      .then(result => result.data)
      .catch(err => {
        return err;
      });
  },

};
