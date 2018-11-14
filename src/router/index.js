import Vue from "vue";
import Router from "vue-router";
import ProductInstanceForm from "../components/ProductInstanceForm";
import ProductInstancesTable from "../components/ProductInstancesTable";
import ProductForm from "../components/ProductForm";
import ProductsTable from "../components/ProductsTable";
import ProductsStatistiquesTable from "../components/ProductsStatistiquesTable";
import OrderForm from "../components/OrderForm";
import OrdersTable from "../components/OrdersTable";
import PreOrderForm from "../components/PreOrderForm";
import ProductsBetterEatTable from "../components/ProductsBetterEatTable";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/base-products/:id",
      components: {
        default: ProductInstanceForm,
        drawer: ProductInstancesTable
      },
      props: { default: true, drawer: true }
    },
    {
      path: "/base-products",
      components: {
        default: ProductInstanceForm,
        drawer: ProductInstancesTable
      }
    },
    {
      path: "/my-products/:id",
      components: {
        default: ProductForm,
        drawer: ProductsTable
      },
      props: { default: true, drawer: true }
    },
    {
      path: "/my-products",
      components: {
        default: ProductForm,
        drawer: ProductsTable
      }
    },
    {
      path: "/stat-products",
      components: {
        default: ProductsStatistiquesTable,
        drawer: null
      }
    },
    {
      path: "/better-eat-products",
      components: {
        default: ProductsBetterEatTable,
        drawer: null
      }
    },
    {
      path: "/my-orders/:id",
      components: {
        default: OrderForm,
        drawer: OrdersTable
      },
      props: { default: true, drawer: true }
    },
    {
      path: "/my-orders",
      components: {
        default: OrderForm,
        drawer: OrdersTable
      }
    },
    {
      path: "/my-preorder",
      components: {
        default: PreOrderForm,
        drawer: null
      }
    }
  ]
});
