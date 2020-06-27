<template>
  <div class="container text-center">
    <div class="row">
      <div class="col-3 card" style="margin: 1em auto;">
        <form  @submit.prevent="submitLogin" class="form-signin" id="login-form">
          <img class="mb-4" src="https://2.bp.blogspot.com/-2TZJ3M9sSx4/Vs7gZnFNwgI/AAAAAAAABUM/v3R88LMR0Zc/s1600/login.png" alt="" width="100" height="72">
          <h6 class="h3 mb-3 font-weight-normal">Please sign in</h6>
          <label for="inputEmail" class="sr-only">Username / Email address</label>
          <input v-model="loginEmail" placeholder="Input Email" type="username" id="inputLoginEmail" class="form-control">
          <label for="inputPassword" class="sr-only">Password</label>
          <input v-model="loginPassword" placeholder="Input Password" type="password" class="form-control">
          <div class="checkbox mb-3">
            <label>
              <input type="checkbox" value="remember-me"> Remember me
            </label>
          </div>
          <button class="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
const Axios = require('axios');

export default {
  name: 'Login',
  data() {
    return {
      loginEmail: '',
      loginPassword: '',
    };
  },
  methods: {
    submitLogin() {
      Axios({
        method: 'POST',
        url: 'https://baj-e-commerce-cms.herokuapp.com/login',
        data: {
          email: this.loginEmail,
          password: this.loginPassword,
        },
      })
        .then((response) => {
          console.log(response.data);
          localStorage.setItem('access_token', response.data.access_token);
          this.$router.push('/product');
        })
        .catch((err) => {
          console.log(err);
          console.log('tidak jalan');
        });
    },
  },
};
</script>

<style scoped>
</style>
