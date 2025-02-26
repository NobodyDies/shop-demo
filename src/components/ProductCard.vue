<template>
<v-card
  class="product-card"
  @click="goToProduct(product.id)"
>
  <v-img
    :src="product.image"
    height="200"
  />
  <v-card-title>{{ product.title }}</v-card-title>
  <v-card-subtitle>{{ product.price }} $</v-card-subtitle>
  <v-card-actions>
    <v-btn
      color="success"
      @click.stop="onBuy"
    >
      Купить
    </v-btn>
  </v-card-actions>
</v-card>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router';
import { Product } from '@/services/products';
import { useCartStore } from '@/store/cart';

const router = useRouter();
const cartStore = useCartStore();

const props = defineProps<{
  product: Product;
}>();

const goToProduct = (id: number) => {
  router.push({ name: 'Product', params: { id } });
};

const onBuy = () => {
  cartStore.addToCart({
    id: props.product.id,
    title: props.product.title,
    price: props.product.price,
    image: props.product.image
  });
};
</script>

<style scoped lang="scss">
.product-card {
  cursor: pointer;
}
</style>
