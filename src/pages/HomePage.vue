<template>
<v-container>
  <h1>Категории</h1>
  <category-scaffolding v-if="isLoading"/>
  <v-row>
    <v-col
      v-for="(cat, index) in categories"
      :key="index"
      cols="6" sm="4" md="3"
    >
      <v-card
        class="category-card"
        @click="goToCategory(cat)"
      >
        <v-img
          :src="getCategoryImage(cat)"
          height="150"
          contain
        />
        <v-card-text>
          <p class="title">{{ cat }}</p>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>

  <h1>Все товары</h1>
  <product-scaffolding v-if="isLoading"/>
  <v-row>
    <v-col
      v-for="product in products"
      :key="product.id"
      cols="6"
      sm="4"
      md="3"
    >
      <ProductCard :product="product" />
    </v-col>
  </v-row>
</v-container>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { fetchAllProducts, fetchCategories, Product } from '@/services/products';
import { useRouter } from 'vue-router';
import ProductCard from '@/components/ProductCard.vue';
import CategoryScaffolding from '@/components/CategoryScaffolding.vue';
import ProductScaffolding from '@/components/ProductScaffolding.vue';

// В API нет изображений для категорий, поэтому используем заглушку
const categoryImages: Record<string, string> = {
  electronics: 'https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_.jpg',
  jewelery: 'https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg',
  "men's clothing": 'https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg',
  "women's clothing": 'https://fakestoreapi.com/img/51eg55uWmdL._AC_UX679_.jpg'
};

const products = ref<Product[]>([]);
const categories = ref<string[]>([]);
const isLoading = ref<boolean>(true);
const router = useRouter();

const loadData = async () => {
  try {
    const [prodData, catData] = await Promise.all([
      fetchAllProducts(),
      fetchCategories()
    ]);
    products.value = prodData;
    categories.value = catData;
  } catch (e) {
    console.error(e);
  } finally {
    isLoading.value = false;
  }
};

const goToCategory = (category: string) => {
  router.push({ name: 'Category', params: { categoryName: category } });
};

const getCategoryImage = (cat: string): string => {
  return categoryImages[cat] || 'https://placehold.co/300x200.png?text=No+Image';
};

onMounted(() => {
  loadData();
});
</script>

<style lang="scss" scoped>
.category-card {
  cursor: pointer;
  text-align: center;
  margin-bottom: 20px;

  .title {
    font-weight: bold;
    text-transform: capitalize;
    margin-top: 8px;
  }
}
</style>
