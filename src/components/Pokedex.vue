<script setup lang="ts">
import { ref } from 'vue';
import { usePokedexStore } from '../stores/pokedex';

const store = usePokedexStore();

</script>

<template>
    <div class="card pa-4">
    <v-row align="center" class="mb-4">
      <v-col cols="3">
        <v-img
          :src="store.dataPokemon.sprites.front_default"
          alt="Foto"
          width="60"
          height="60"
          class="rounded-circle"
        ></v-img>
      </v-col>
      <v-col>
        <div class="text-h6 font-weight-bold">{{store.dataPokemon.name}}</div>
      </v-col>
    </v-row>

    <v-row justify="center">
    <ul>
      <li><strong>Peso:</strong>{{store.dataPokemon.weight}} Libras</li> 
      <li><strong>Altura:</strong>{{store.dataPokemon.height}} Pies</li> 
      </ul>
    </v-row>
  </div>
</template>

<style scoped>
.card {
  border: 1px solid #ccc;
  border-radius: 8px;
}
.rounded-circle {
  border-radius: 50%;
}
</style>