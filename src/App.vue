

<script setup lang="ts">
  import VoiceBot from './components/VoiceBot.vue';
  import Pokedex from './components/Pokedex.vue';
</script>


<template>
  <v-container class="pokedex" fluid>
    <v-row no-gutters class="screens">
      <!-- Pantalla izquierda -->
      <v-col cols="5" class="left-panel">
        <v-sheet class="screen-left" elevation="4">
        <VoiceBot/>
          <slot name="left"></slot>
        </v-sheet>
      </v-col>

      <!-- Bisagra -->
      <v-col cols="1" class="hinge"></v-col>

      <!-- Pantalla derecha -->
      <v-col cols="6" class="right-panel">
        <v-sheet class="screen-right" elevation="4">
        <Pokedex/>
          <slot name="right"></slot>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.pokedex {
  background-color: #d00000;
  border: 4px solid black;
  border-radius: 12px;
  height: 400px;
  max-width: 800px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.4);
}

.screens {
  width:100%;
  height:100%
}

.left-panel, .right-panel {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #d00000;
  padding: 12px;
}

.screen-left, .screen-right {
  width: 100%;
  height: 80%;
  border: 3px solid black;
  border-radius: 8px;
  box-shadow: inset 0 0 8px rgba(0,0,0,0.5);
}

.screen-left {
  background: white;
}

.screen-right {
  background: #00ff00; /* verde brillante */
}

.hinge {
  background-color: #a00000;
  border-left: 2px solid black;
  border-right: 2px solid black;
}
</style>
