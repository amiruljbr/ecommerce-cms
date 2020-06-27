import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import DetailProduct from '../views/DetailProduct.vue';
import NotFound from '../views/NotFound.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/product',
    name: 'Home',
    component: Home,
  },
  {
    path: '/product/:id',
    name: 'DetailProduct',
    component: DetailProduct,
  },
  {
    path: '/',
    name: 'Login',
    component: Login,
  },
  {
    path: '*',
    name: 'NotFound',
    component: NotFound,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((route, from, next) => {
  const path = ['Login', 'NotFound'];
  if (!path.includes(route.name) && !localStorage.access_token) {
    next({ name: 'Login' });
  } else {
    next();
  }
});

export default router;
