<script setup lang="ts">
import { ref } from 'vue';
import { useHistorialStore } from '../stores/historial';

const store = useHistorialStore();

</script>



<template>
  <v-list >
    <v-list-subheader style="color:white;" >Historial</v-list-subheader>

    <v-list-item
      v-for="(item, index) in store.dataHistorial"
      :key="index"
    >
      <v-list-item-content class="historial"  >
        <v-list-item-title>{{ item.title }}</v-list-item-title>
        <v-list-item-subtitle>{{ item.subtitle }}</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
  </v-list>
</template> 