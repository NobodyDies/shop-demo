import { describe, it, expect, beforeEach } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useCartStore } from '@/store/cart';

describe('Cart Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    localStorage.clear();
  });

  it('должен инициализироваться с пустым массивом товаров', () => {
    const cartStore = useCartStore();
    expect(cartStore.items).toEqual([]);
  });

  it('должен добавлять товар в корзину', () => {
    const cartStore = useCartStore();

    cartStore.addToCart({ id: 1, title: 'Test Product', price: 100, image: 'image.jpg' });

    expect(cartStore.items).toHaveLength(1);
    expect(cartStore.items[0]).toEqual({
      id: 1,
      title: 'Test Product',
      price: 100,
      image: 'image.jpg',
      quantity: 1
    });
  });

  it('должен увеличивать количество товара, если он уже в корзине', () => {
    const cartStore = useCartStore();

    cartStore.addToCart({ id: 1, title: 'Test Product', price: 100, image: 'image.jpg' });
    cartStore.addToCart({ id: 1, title: 'Test Product', price: 100, image: 'image.jpg' });

    expect(cartStore.items).toHaveLength(1);
    expect(cartStore.items[0].quantity).toBe(2);
  });

  it('должен удалять товар из корзины', () => {
    const cartStore = useCartStore();

    cartStore.addToCart({ id: 1, title: 'Test Product', price: 100, image: 'image.jpg' });
    cartStore.removeFromCart(1);

    expect(cartStore.items).toEqual([]);
  });

  it('должен очищать корзину', () => {
    const cartStore = useCartStore();

    cartStore.addToCart({ id: 1, title: 'Product 1', price: 100, image: 'image1.jpg' });
    cartStore.addToCart({ id: 2, title: 'Product 2', price: 200, image: 'image2.jpg' });

    cartStore.clearCart();

    expect(cartStore.items).toEqual([]);
  });

  it('должен корректно считать общее количество товаров', () => {
    const cartStore = useCartStore();

    cartStore.addToCart({ id: 1, title: 'Product 1', price: 100, image: 'image1.jpg' });
    cartStore.addToCart({ id: 1, title: 'Product 1', price: 100, image: 'image1.jpg' });
    cartStore.addToCart({ id: 2, title: 'Product 2', price: 200, image: 'image2.jpg' });

    expect(cartStore.totalItems).toBe(3);
  });

  it('должен корректно считать общую стоимость корзины', () => {
    const cartStore = useCartStore();

    cartStore.addToCart({ id: 1, title: 'Product 1', price: 100.23, image: 'image1.jpg' });
    cartStore.addToCart({ id: 1, title: 'Product 1', price: 100.23, image: 'image1.jpg' });
    cartStore.addToCart({ id: 2, title: 'Product 2', price: 200.75, image: 'image2.jpg' });

    expect(cartStore.totalPrice.toFixed(2)).toBe('401.21');
  });

  it('должен сохранять корзину в localStorage', () => {
    const cartStore = useCartStore();

    cartStore.addToCart({ id: 1, title: 'Test Product', price: 100, image: 'image.jpg' });
    expect(localStorage.getItem('cartItems')).toBe(JSON.stringify(cartStore.items));
  });

  it('должен загружать корзину из localStorage', () => {
    localStorage.setItem(
      'cartItems',
      JSON.stringify([{ id: 1, title: 'Test Product', price: 100, image: 'image.jpg', quantity: 2 }])
    );

    const cartStore = useCartStore();
    cartStore.loadCartFromLocalStorage();

    expect(cartStore.items).toEqual([
      { id: 1, title: 'Test Product', price: 100, image: 'image.jpg', quantity: 2 }
    ]);
  });
});
