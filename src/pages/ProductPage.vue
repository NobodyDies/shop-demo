<template>
<v-container>
  <v-row>
    <v-col cols="12" md="6">
      <v-img :src="product?.image" height="400"/>
    </v-col>
    <v-col cols="12" md="6" v-if="product">
      <h2>{{ product.title }}</h2>
      <p><strong>Цена:</strong> {{ product.price }} $</p>
      <p>{{ product.description }}</p>
      <v-btn color="success" @click="buy(product)">Купить</v-btn>
    </v-col>
  </v-row>
</v-container>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { fetchProductById, Product } from '@/services/products';
import { useCartStore } from '@/store/cart';

const product = ref<Product | null>(null);
const props = defineProps<{ id: string }>();
const cartStore = useCartStore();

const loadData = async () => {
  try {
    product.value = await fetchProductById(+props.id);
  } catch (error) {
    console.error(error);
  }
};

const buy = (item: Product | null) => {
  if (!item) return;
  cartStore.addToCart({
    id: item.id,
    title: item.title,
    price: item.price,
    image: item.image
  });
};

onMounted(loadData);
</script>

<style scoped lang="scss">
</style>
