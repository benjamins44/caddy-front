import axios from "axios";

const BASE_URL = "http://localhost:8080";

export default {
  // return all products instance
  getProducts() {
    const http = axios.create({
      baseURL: BASE_URL
    });

    return http
      .get("/products")
      .then(result => result.data)
      .catch(err => {
        return err;
      });
  },
  // return all products instance
  getProductsByLabel(label) {
    const http = axios.create({
      baseURL: BASE_URL
    });

    return http
      .get(`/products/query?label=${label}`)
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
      .get(`/products/${id}`)
      .then(result => result.data)
      .catch(err => {
        return err;
      });
  },
  // update products instance by id
  updateProducts(product) {
    const http = axios.create({
      baseURL: BASE_URL
    });

    return http
      .put(`/products/${product.id}`, product)
      .then(result => result.data)
      .catch(err => {
        return err;
      });
  },
  // return all products instance
  calculateStats() {
    const http = axios.create({
      baseURL: BASE_URL
    });

    return http
      .get("/products/stats")
      .then(result => result.data)
      .catch(err => {
        return err;
      });
  },
};
