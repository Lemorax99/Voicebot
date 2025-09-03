

<script setup lang="ts">
  import VoiceBot from './components/VoiceBot.vue';
  import Pokedex from './components/Pokedex.vue';
  import Historial from './components/Historial.vue';
</script>


<template>
  <v-app class='general' > 
    <v-app-bar color="transparent" elevation="0" flat id="bordegris" > 
      <v-toolbar-title class="d-flex align-center"> 
        <v-icon size="32" color="primary">
          <svg class="pokebola" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
          <path clip-rule="evenodd" d="M24 0C10.7452 0 0 10.7452 0 24C0 37.2548 10.7452 48 24 48C37.2548 48 48 37.2548 48 24C48 10.7452 37.2548 0 24 0ZM24 36C17.3726 36 12 30.6274 12 24C12 17.3726 17.3726 12 24 12C30.6274 12 36 17.3726 36 24C36 30.6274 30.6274 36 24 36Z" fill="currentColor" fill-rule="evenodd"></path>
          <path d="M24 30C27.3137 30 30 27.3137 30 24C30 20.6863 27.3137 18 24 18C20.6863 18 18 20.6863 18 24C18 27.3137 20.6863 30 24 30Z" fill="currentColor"></path>
          </svg>
        </v-icon>
        <span class="ml-2 font-weight-bold text-h6">PokeVoice</span>
      </v-toolbar-title>
    </v-app-bar>
    <v-navigation-drawer app permanent width="200" class="historial" > 
      <Historial />
    </v-navigation-drawer>
    <v-main>     
        <div class="d-flex flex-column align-center fill-height" style="margin-left:-13%">
          <Pokedex class="pokedex" />
          <VoiceBot />
        </div>
      
    </v-main>
  </v-app>
</template>

<style scoped>

.general{
  background:#111827;
  color:white;
  display:flex;
}

.pokebola {
  height: 2rem;       /* equivale a h-8 */
  width: 2rem;        /* equivale a w-8 */
  color: #ea2a33;     /* equivale a text-[#ea2a33] */
}
.historial{
    background-color: #080c14;
    color: white !important; 
}

#bordegris {
  border-bottom: 1px solid #1F2937;   
}

.pokedex {
  background-color: #d00000; 
  border-radius: 12px; 
  max-width: 800px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.4);
  margin-top:2%;
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
