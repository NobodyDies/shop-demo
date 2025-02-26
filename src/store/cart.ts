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

  const totalPrice = computed(() =>
    items.value.reduce((sum, item) => sum + item.price * item.quantity, 0)
  );

  function loadCartFromLocalStorage() {
    const stored = localStorage.getItem('cartItems');
    if (stored) {
      try {
        items.value = JSON.parse(stored);
      } catch {
        items.value = [];
      }
    }
  }

  function saveCartToLocalStorage() {
    localStorage.setItem('cartItems', JSON.stringify(items.value));
  }

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
    saveCartToLocalStorage();
  }

  function removeFromCart(productId: number) {
    items.value = items.value.filter((item) => item.id !== productId);
    saveCartToLocalStorage();
  }

  function clearCart() {
    items.value = [];
    saveCartToLocalStorage();
  }

  return {
    items,
    totalItems,
    totalPrice,
    loadCartFromLocalStorage,
    addToCart,
    removeFromCart,
    clearCart,
  };
});
