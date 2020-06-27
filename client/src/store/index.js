import Vue from 'vue';
import Vuex from 'vuex';
import Axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    products: [],
    productDetail: null,
  },
  mutations: {
    SET_PRODUCT(state, payload) {
      state.products = payload;
    },
    SET_DETAIL(state, payload) {
      state.productDetail = payload;
    },
  },
  actions: {
    getProducts({ commit }) {
      Axios({
        method: 'GET',
        url: 'https://baj-e-commerce-cms.herokuapp.com/product',
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
        url: 'https://baj-e-commerce-cms.herokuapp.com/product',
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
        url: `https://baj-e-commerce-cms.herokuapp.com/product/${productId}`,
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
        url: `https://baj-e-commerce-cms.herokuapp.com/product/${productId}`,
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
          url: `https://baj-e-commerce-cms.herokuapp.com/product/${productId}`,
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
