<template>
  <tr>
    <td>{{product.id}}</td>
    <td>{{product.name}}</td>
    <td><img v-bind:src="product.image_url" style="width:100px;height:50px;"></td>
    <td>Rp. {{product.price}}</td>
    <td>{{product.stock}} item</td>
    <td> <button type="button" class="btn btn-secondary btn m-1" @click="toDetail">
        View Detail
    </button>
    </td>
  </tr>
</template>

<script>
export default {
  name: 'TableContain',
  data() {
    return {
    };
  },
  props: ['product'],
  computed: {
  },
  methods: {
    toDetail() {
      this.$router.push(`/product/${this.product.id}`);
    },
  },
};
</script>

<style>

</style>
