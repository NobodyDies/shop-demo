<template>
<v-row>
  <v-col
    v-for="n in 4"
    :key="'cat-' + n"
    cols="6"
    sm="4"
    md="3"
  >
    <v-card>
      <v-skeleton-loader type="image" />
      <v-skeleton-loader type="text" />
    </v-card>
  </v-col>
</v-row>
</template>
