<template>
<v-app-bar app>
  <v-toolbar-title>My Vue Shop</v-toolbar-title>

  <v-spacer />

  <v-btn icon to="/cart">
    <v-icon>mdi-cart</v-icon>
    <v-badge
      color="error"
      :content="cartItemCount"
      overlap
      v-if="cartItemCount > 0"
    />
  </v-btn>
</v-app-bar>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useCartStore } from '@/store/cart';

export default defineComponent({
  name: 'NavBar',
  setup() {
    const cartStore = useCartStore();
    const cartItemCount = computed(() => cartStore.totalItems);

    return {
      cartItemCount
    };
  },
});
</script>

<style scoped>
</style>
