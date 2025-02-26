import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

export interface CartItem {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
}

export const useCartStore = defineStore('cart', () => {
  const items = ref<CartItem[]>([]);

  const totalItems = computed(() =>
    items.value.reduce((sum, item) => sum + item.quantity, 0)
  );

  function addToCart(product: Omit<CartItem, 'quantity'>) {
    const existingItem = items.value.find((item) => item.id === product.id);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      items.value.push({
        ...product,
        quantity: 1
      });
    }
  }

  return {
    items,
    totalItems,
    addToCart,
  };
});
