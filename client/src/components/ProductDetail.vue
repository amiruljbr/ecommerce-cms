<template>
  <div>
    <div class="container row justify-content-md-center">
      <div class="card" style="width: 18rem;">
        <img class="card-img-top" v-bind:src="product.image_url" alt="Card image cap">
        <div class="card-body">
          <h5 class="card-title">{{product.name}}</h5>
        </div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item">Price: {{product.price}}</li>
          <li class="list-group-item">Stock: {{product.stock}}</li>
        </ul>
        <div class="card-body">
          <button class="button btn-primary m-2" @click="showModal = !showModal">
            Action
          </button>
          <button class="button btn-danger m-2"  @click="showDelete = !showDelete">
            Delete
          </button>
        </div>
      </div>
    </div>
    <!-- modal Edit -->
     <div v-if="showModal" class="loadingModal">
      <div class="theModal">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Edit Product</h5>
              <button type="button" class="close" @click="showModal = !showModal">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <form  @submit.prevent="submitEditProduct" class="form-register" >
                <br>
                <input v-model="product.name" type="text" class="form-control" placeholder="Input Name" required="" autofocus="">
                <br>
                <input v-model="product.image_url" type="text" class="form-control" placeholder="Input Image Url" required="" autofocus="">
                <br>
                <input v-model="product.price" type="number" class="form-control" placeholder="Input Price" required="" autofocus="">
                <br>
                <input v-model="product.stock" type="number" class="form-control" placeholder="Input Stock" required="" autofocus="">
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" @click="showModal = !showModal">Cancel</button>
                  <button type="submit" class="btn btn-primary">Update</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- modal Delete -->
     <div v-if="showDelete" class="loadingModal">
      <div class="theModal">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Delete Confirmation</h5>
              <button type="button" class="close" @click="showDelete = !showDelete">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
                <h3>Are you sure want to Delete This?</h3>
                <div class="modal-footer">
                  <button type="button" class="btn btn-primary" @click="showDelete = !showDelete">Cancel</button>
                  <button type="button" class="btn btn-danger" @click="submitDelete">Delete</button>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductDetail',
  data() {
    return {
      product: {},
      showModal: false,
      showDelete: false,
    };
  },
  computed: {
  },
  created() {
    this.$store.dispatch('getOneProduct', this.$route.params.id)
      .then((response) => {
        this.product = response;
      })
      .catch((err) => {
        console.log(err);
        this.$router.push('/notFound');
      });
  },
  components: {
  },
  methods: {
    submitEditProduct() {
      console.log('proses Edit product');
      const payload = {
        name: this.product.name,
        image_url: this.product.image_url,
        price: this.product.price,
        stock: this.product.stock,
      };
      this.$store.dispatch('editProduct', { product: payload, productId: this.product.id });
      this.showModal = false;
    },
    submitDelete() {
      console.log('proses Delete product');
      this.$store.dispatch('deleteProduct', this.product.id);
      this.showDelete = false;
      this.$router.push('/product');
    },
  },
};
</script>

<style>

</style>
