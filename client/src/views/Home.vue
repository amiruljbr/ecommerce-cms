<template>
  <div class="container">
    <h4>List Product</h4>
    <table class="table table-hover table-bordered">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Name</th>
          <th scope="col">Image</th>
          <th scope="col">Price</th>
          <th scope="col">Stock</th>
          <th scope="col">Category</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>Baju</td>
          <td>Gambar1</td>
          <td>Rp. 50,000,-</td>
          <td>50 item</td>
          <td>Fasion  </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
// @ is an alias to /src
export default {
  name: 'Home',
  components: {
  },
};
</script>
