<template>
<v-app>
  <v-layout>
    <NavBar />
    <v-main>
      <router-view />
    </v-main>
  </v-layout>
</v-app>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import NavBar from '@/components/NavBar.vue';

export default defineComponent({
  name: 'App',
  components: {
    NavBar
  },
});
</script>
