<template>
  <table class="table table-hover table-bordered">
    <thead>
      <tr>
        <th scope="col">ID</th>
        <th scope="col">Name</th>
        <th scope="col">Image</th>
        <th scope="col">Price</th>
        <th scope="col">Stock</th>
        <th scope="col">Action</th>
      </tr>
    </thead>
    <tbody>
      <TableContain v-for="product in products" v-bind:key="product.id" v-bind:product="product">
      </TableContain>
    </tbody>
  </table>
</template>

<script>
import TableContain from './TableContain.vue';

export default {
  name: 'TableProduct',
  computed: {
    products() {
      return this.$store.state.products;
    },
  },
  created() {
    this.$store.dispatch('getProducts');
  },
  components: {
    TableContain,
  },
};
</script>

<style>

</style>
