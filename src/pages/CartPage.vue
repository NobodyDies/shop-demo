<template>
<v-container>
  <h1>Корзина</h1>
  <div v-if="cartStore.items.length === 0">
    <p>Корзина пуста.</p>
  </div>
  <v-row v-else>
    <v-col cols="12" sm="8">
      <v-list>
        <v-list-item
          v-for="item in cartStore.items"
          :key="item.id"
          class="cart-item-row"
        >
          <template #prepend>
            <v-avatar size="40">
              <v-img :src="item.image" />
            </v-avatar>
          </template>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
          <v-list-item-subtitle>
            Цена: {{ item.price }} $ - Кол-во: {{ item.quantity }}
          </v-list-item-subtitle>
          <v-list-item-action>
            <v-btn size="x-small" icon color="error" @click="remove(item.id)">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </v-list-item-action>
        </v-list-item>
      </v-list>
    </v-col>

    <v-col cols="12" sm="4">
      <v-card>
        <v-card-title>Итого: {{ cartStore.totalPrice }} $</v-card-title>
        <v-card-actions>
          <v-btn color="primary" @click="checkout">Оформить заказ</v-btn>
          <v-dialog v-model="dialog" max-width="400">
            <v-card>
              <v-card-title>Поздравляем!</v-card-title>
              <v-card-text>
                Ваш заказ успешно оформлен!
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="closeDialog">OK</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</v-container>
</template>

<script lang="ts" setup>
import { useCartStore } from '@/store/cart.ts';
import { ref } from 'vue';

const cartStore = useCartStore();
const dialog = ref(false);

const remove = (id: number) => {
  cartStore.removeFromCart(id);
};

const checkout = () => {
  dialog.value = true;
};

const closeDialog = () => {
  dialog.value = false;
  cartStore.clearCart();
};
</script>

<style lang="scss" scoped>

</style>
