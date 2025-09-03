<script setup lang="ts">
import { ref } from 'vue';
import { useVoiceStore } from '../stores/voicebot';
import { usePokedexStore } from '../stores/pokedex';
import { useHistorialStore } from '../stores/historial';
import {compararPokemonInfo,savePokemonInfo,getPokemonInfo,toolDescription} from '../tools/pokemonTool'

const store = useVoiceStore();
const storePokedex = usePokedexStore();
const storeHistorial = useHistorialStore();
const recognition = ref<SpeechRecognition | null>(null);

// Inicializa reconocimiento de voz (Web Speech API)
function initSpeechRecognition() {
  const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
  if (!SpeechRecognition) {
    alert('Tu navegador no soporta reconocimiento de voz');
    return null;
  }
  const recog = new SpeechRecognition();
  recog.lang = 'es-ES';
  recog.interimResults = false;
  recog.maxAlternatives = 1;

  recog.onstart = () => store.setRecording(true);
  recog.onend = () => store.setRecording(false);
  recog.onresult = async (event: SpeechRecognitionEvent) => {
    const transcript = event.results[0][0].transcript;
    store.setUserSpeech(transcript);
    await sendToGemini(transcript);
  };

  return recog;
}

async function sendToGemini(sendText: string) {
  try { 

    const text = toolDescription + sendText

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${import.meta.env.VITE_GEMINI_API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text }] }]
      })
    }); 
    const data = await response.json();
    const botReply = data?.candidates?.[0]?.content?.parts?.[0]?.text || 'No response'; 
    const cleaned = botReply.replace(/```json|```/g, '').trim(); 
    let parsed = null;
    if (cleaned.includes('tool')) {
      parsed = JSON.parse(cleaned);
    } 
    if (parsed) {
      useTools(parsed,sendText);
    }else{
      store.setBotResponse(botReply);
    }
    
    
  } catch (error) {
    console.error(error);
    store.setBotResponse('Error al conectar con Gemini');
  }
}

async function useTools(parsed,text) { 
  if(parsed.tool == 'getPokemonInfo'){
    const data = await getPokemonInfo(parsed.arguments.name); 
    storePokedex.setDataPokemon(data);
    storeHistorial.setDataHistorial = storeHistorial.dataHistorial.push({"title":text,subtitle:"Pokemon : "+parsed.arguments.name})
    console.log(storeHistorial.dataHistorial);
    store.setBotResponse(parsed.arguments.mensaje);
  }
  else if(parsed.tool == 'compararPokemonInfo'){
    const response = await compararPokemonInfo(parsed.arguments.pokemon1,parsed.arguments.pokemon2,parsed.arguments.rasgos);
    store.setBotResponse(response); 
  }else{
    const data = storePokedex.dataPokemon;
    if (data.name != ""){
      store.setBotResponse('Realizando envio por favor espere...');
      const res = await savePokemonInfo(data); 
      store.setBotResponse('Información enviada.');
    }else{
      store.setBotResponse('No se esta mostrando ningun pokemon actualmente.');
    }
  }
  

}

function toggleRecording() {

  store.botResponse = null;
  store.userSpeech = null;

  if (!recognition.value) recognition.value = initSpeechRecognition();
  if (!recognition.value) return;

  if (!store.isRecording) {
    recognition.value.start();
  } else {
    recognition.value.stop();
  }
}
</script>

<template>
  <v-container class="pa-4" max-width="400">
     <div class="py-6">
    <!-- Mensaje del usuario -->
    <transition name="chat">
      <div v-if="store.userSpeech" class="d-flex justify-end mb-4">
        <v-sheet class="pa-3 rounded-lg" color="blue-darken-3">
          <p class="text-body-2 text-white">{{ store.userSpeech }}</p>
        </v-sheet>
      </div>
    </transition>

    <!-- Mensaje del bot -->
    <transition name="chat">
      <div v-if="store.botResponse" class="d-flex justify-start">
        <v-sheet class="pa-3 rounded-lg" color="grey-darken-3">
          <p class="text-body-2 text-white">{{ store.botResponse }}</p>
        </v-sheet>
      </div>
    </transition>
  </div>
  <div class="footer-container" id="bordegris">
    <v-btn 
      size="80"
      rounded="circle"
      elevation="8"
      class="ma-4 "
      :color="store.isRecording ? 'gray' : '#EA2A33'"   
      @click="toggleRecording"
    >
      <span 
        class="material-symbols-outlined" 
        style="font-size: 40px"  
      >
        mic
      </span> 
    </v-btn>
  </div>
  </v-container>
 
</template>

<style>
.footer-container {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  border-top: 1px solid #1F2937;  
  display: flex;
  justify-content: center;  
  padding: 8px 0;
  z-index: 1000;   
}
/* Animaciones para aparecer/desaparecer */
.chat-enter-active,
.chat-leave-active {
  transition: all 0.4s ease;
}
.chat-enter-from {
  opacity: 0;
  transform: translateY(10px);
}
.chat-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
 
</style>