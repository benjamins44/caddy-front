<template>
  <div class="drawer">
    <el-input 
      v-on:keyup.native="searchChanged"
      placeholder="Recherche" 
      v-model="search">
    </el-input>
    <el-table
      :data="this.orders"
      :default-sort = "{prop: 'date', order: 'descending'}"
      v-on:cell-click="selectorder"
      style="width: 100%">
      <el-table-column
        class-name="pointer"
        prop="id"
        label="Commande"
        >
      </el-table-column>
      <el-table-column
        class-name="pointer"
        prop="date"
        label="Date"
        >
      </el-table-column>
      <el-table-column
        class-name="pointer"
        prop="sign"
        label="Magasin"
        >
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "orders-table",
  data() {
    return {
      search: "",
      init: false
    };
  },
  mounted() {
    const id = this.$route.params.id;
    if (id) {
      this.init = true;
    }
  },
  computed: {
    ...mapState({
      orders: state => state.orders.orders
    }),
    myOrders() {
      return this.orders;
    }
  },
  watch: {
    myOrders(newOrder, oldOrder) {
      if (!this.init && newOrder && newOrder.length > 0) {
        this.selectorder(newOrder[0]);
        this.init = true;
      }
    },
    "$route.params.id"(id) {
      if (!id) {
        this.selectorder(this.orders[0]);
        this.init = true;
      }
    }
  },
  methods: {
    searchChanged(value) {
      if (!this.search) {
        this.$store.dispatch("loadAllOrders", "olivia.benjamin.corre@gmail.com");
      } else if (this.search && this.search.length > 2) {
        this.$store.dispatch("loadAllOrdersByLabel", { customer: "olivia.benjamin.corre@gmail.com", search: this.search });
      }
    },
    selectorder(order) {
      const navigation = `/my-orders/${order.id}`;
      this.$router.push(navigation);
    }
  }
};
</script>
<style>
.drawer {
  padding: 0.5em;
}
.pointer {
  cursor: pointer;
}
</style>