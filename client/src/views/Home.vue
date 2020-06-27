<template>
  <section>
    <Navbar></Navbar>
    <div class="container">
      <h4>List Product</h4>
      <button type="button" class="col m-1 btn btn-primary" @click="showModal = !showModal">
        Add Product
      </button>
      <TableProduct></TableProduct>
    </div>
    <div v-if="showModal" class="loadingModal">
      <div class="theModal">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Add Product</h5>
              <button type="button" class="close" @click="showModal = !showModal">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <form  @submit.prevent="submitAddProduct" class="form-register" >
                <br>
                <input v-model="inputName" type="text" class="form-control" placeholder="Input Name" required="" autofocus="">
                <br>
                <input v-model="inputImage" type="text" class="form-control" placeholder="Input Image Url" required="" autofocus="">
                <br>
                <input v-model="inputPrice" type="number" class="form-control" placeholder="Input Price" required="" autofocus="">
                <br>
                <input v-model="inputStock" type="number" class="form-control" placeholder="Input Stock" required="" autofocus="">
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" @click="showModal = !showModal">Cancel</button>
                  <button type="submit" class="btn btn-primary">Create</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import TableProduct from '../components/TableProduct.vue';
import Navbar from '../components/Navbar.vue';
// @ is an alias to /src
export default {
  name: 'Home',
  data() {
    return {
      showModal: false,
      inputName: null,
      inputImage: null,
      inputPrice: null,
      inputStock: null,
    };
  },
  computed: {
  },
  methods: {
    submitAddProduct() {
      console.log('proses add product');
      const payload = {
        name: this.inputName,
        image_url: this.inputImage,
        price: this.inputPrice,
        stock: this.inputStock,
      };
      this.$store.dispatch('createProduct', payload);
      this.showModal = false;
      this.inputName = null;
      this.inputImage = null;
      this.inputPrice = null;
      this.inputStock = null;
    },
  },
  components: {
    TableProduct, Navbar,
  },
};
</script>

<style>
</style>
