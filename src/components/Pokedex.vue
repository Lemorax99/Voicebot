<script setup lang="ts">
import { ref } from 'vue';
import { usePokedexStore } from '../stores/pokedex';

const store = usePokedexStore();

</script>

<template>
    <v-card
      class="mx-auto card" 
      color="red-darken-4"
      elevation="10"
      rounded="lg"
    >
      <v-sheet
        class="d-flex align-center justify-space-between topPokedex"
        color="#B91C1C" 
        height="48"
        rounded="0"
        elevation="0"  
      >
        <div class="d-flex align-center ml-2">
          <v-avatar size="24" color="blue-darken-1" class="mr-1" style="border: 2px solid white;"></v-avatar>
          <v-avatar size="12" color="red-lighten-2" class="mr-1"></v-avatar>
          <v-avatar size="12" color="#FACC15" class="mr-1"></v-avatar>
          <v-avatar size="12" color="#4ADE80"></v-avatar>
        </div>
      </v-sheet>

      <v-card-text>
        <div class="d-flex"> 
          <v-sheet
            class="d-flex align-center justify-center pokemon-frame" 
            width="200"
            height="200" 
          >
            <v-img
              :src="store.dataPokemon.sprites.front_default"
              contain
            />
          </v-sheet>

          <!-- Datos -->
          <div class="ml-4 mt-2 flex-grow">
            <h3 class="text-h5 font-gameboy">{{store.dataPokemon.name}}</h3>
            <div class="text-caption font-gameboy">
              <div v-if="store.dataPokemon.weight" ><strong>Peso:</strong> {{store.dataPokemon.weight}} lb</div>
              <div v-if="store.dataPokemon.height" ><strong>Altura:</strong> {{store.dataPokemon.height}} m</div>
              <div v-if="store.dataPokemon.types[0].type.name" ><strong>Poder:</strong> {{store.dataPokemon.types[0].type.name}} </div>
            </div>
          </div>
        </div>
 
        <div class="d-flex justify-space-between mt-10">
          <div class="d-flex">
            <v-sheet width="40" height="8" color="blue-lighten-2" rounded class="mr-1"></v-sheet>
            <v-sheet width="40" height="8" color="blue-lighten-2" rounded></v-sheet>
          </div>
          <div class="d-flex flex-column align-center">
            <v-avatar size="16" color="#FACC15" style="border: 2px solid white;"></v-avatar>
            <div class="d-flex mt-1">
              <v-sheet width="32" height="4" color="grey-darken-1" class="mr-1"></v-sheet>
              <v-sheet width="32" height="4" color="grey-darken-1" class="mr-1"></v-sheet>
              <v-sheet width="32" height="4" color="grey-darken-1"></v-sheet>
            </div>
          </div>
        </div>
      </v-card-text>
    </v-card> 
</template>

<style scoped>
.card {
  border: 6px solid #DC2626;
  border-radius: 8px;
  width:24%;
  height:41%
}
.rounded-circle {
  border-radius: 50%;
}
.topPokedex{
  margin-left:4%;
  margin-right:4%;
  border-bottom: 4px solid #991B1B;
}

.pokemon-frame { 
  background-color: #1f2d2d;  
  border-radius: 12px;  
  box-shadow:
    inset 0 0 1px 16px #111827,     
    inset 0 0 1px 20px #4B5563,    
    inset 0 0 1px 26px #ffffffff;     
} 

.font-gameboy {
  font-family: 'Press Start 2P', cursive;
}

</style>