<template>
  <div>
    <nav class="navbar navbar-dark bg-dark">
      <div>
        <router-link class="navbar-brand mb-0 h1" to="/product">BAJ E-Commerce</router-link>
      </div>
      <div>
        <button @click="toLogout1" class="btn btn-danger my-2 my-sm-0" type="button">Logout</button>
      </div>
    </nav>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'Navbar',
  methods: {
    toLogout1() {
      console.log('proses logout');
      localStorage.clear();
      this.$router.push('/');
    },
  },
};
</script>
