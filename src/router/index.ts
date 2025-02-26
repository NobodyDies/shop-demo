import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '@/pages/HomePage.vue';
import CategoryPage from '@/pages/CategoryPage.vue';
import ProductPage from '@/pages/ProductPage.vue';
import CartPage from '@/pages/CartPage.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage,
  },
  {
    path: '/category/:categoryName',
    name: 'Category',
    component: CategoryPage,
    props: true
  },
  {
    path: '/product/:id',
    name: 'Product',
    component: ProductPage,
    props: true
  },
  {
    path: '/cart',
    name: 'Cart',
    component: CartPage
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
