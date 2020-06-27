import Vue from 'vue';
import Vuex from 'vuex';
import Axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLoggedIn: false,
    products: [],
    productDetail: null,
  },
  mutations: {
    SET_PRODUCT(state, payload) {
      state.products = payload;
    },
    SET_ISLOGGEDIN(state, payload) {
      state.isLoggedIn = payload;
    },
    SET_DETAIL(state, payload) {
      state.productDetail = payload;
    },
  },
  actions: {
    checkLoggedIn({ commit }) {
      if (localStorage.length > 0) {
        commit('SET_ISLOGGEDIN', true);
      } else {
        commit('SET_ISLOGGEDIN', false);
      }
    },
    getProducts({ commit }) {
      Axios({
        method: 'GET',
        url: 'http://localhost:3000/product',
        headers: {
          access_token: localStorage.access_token,
        },
      })
        .then((response) => {
          commit('SET_PRODUCT', response.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    createProduct(context, payload) {
      Axios({
        method: 'POST',
        url: 'http://localhost:3000/product',
        headers: {
          access_token: localStorage.access_token,
        },
        data: payload,
      })
        .then((response) => {
          context.state.products.push(response.data);
          context.dispatch('getProducts');
        })
        .catch((err) => {
          console.log(err);
        });
    },
    deleteProduct(context, productId) {
      Axios({
        method: 'DELETE',
        url: `http://localhost:3000/product/${productId}`,
        headers: {
          access_token: localStorage.access_token,
        },
      })
        .then((response) => {
          console.log(response.data);
          context.dispatch('getProducts');
        })
        .catch((err) => {
          console.log(err);
        });
    },
    editProduct(context, payload) {
      const { productId, product } = payload;
      Axios({
        method: 'PUT',
        url: `http://localhost:3000/product/${productId}`,
        headers: {
          access_token: localStorage.access_token,
        },
        data: product,
      })
        .then((response) => {
          console.log(response.data);
          context.dispatch('getProducts');
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getOneProduct(context, productId) {
      return new Promise((resolve, reject) => {
        Axios({
          method: 'GET',
          url: `http://localhost:3000/product/${productId}`,
          headers: {
            access_token: localStorage.access_token,
          },
        })
          .then((response) => {
            resolve(response.data);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
  },
  modules: {
  },
});
