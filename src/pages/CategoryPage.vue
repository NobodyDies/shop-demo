<template>
<v-container>
  <h1>Категория: {{ categoryName }}</h1>
  <product-scaffolding v-if="isLoading"/>
  <v-row v-else>
    <v-col
      v-for="product in products"
      :key="product.id"
      cols="6" sm="4" md="3"
    >
      <ProductCard :product="product" />
    </v-col>
  </v-row>
</v-container>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { fetchProductsByCategory, Product } from '@/services/products.ts';
import { useRoute } from 'vue-router';
import ProductCard from '@/components/ProductCard.vue';
import ProductScaffolding from '@/components/ProductScaffolding.vue';

const products = ref<Product[]>([]);
const isLoading = ref<boolean>(true);
const route = useRoute();
const props = defineProps<{
  categoryName: string;
}>();

const loadData = async () => {
  try {
    const category = props.categoryName || route.params.categoryName;
    if (typeof category === 'string') {
      products.value = await fetchProductsByCategory(category);
    }
  } catch (error) {
    console.error(error);
  } finally {
    isLoading.value = false;
  }
};

onMounted(loadData);
</script>

<style scoped lang="scss">
</style>
