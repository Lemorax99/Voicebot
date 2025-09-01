<script setup lang="ts">
import { ref } from 'vue';
import { useVoiceStore } from '../stores/voicebot';
import { usePokedexStore } from '../stores/pokedex';
import {savePokemonInfo,getPokemonInfo,toolDescription} from '../tools/pokemonTool'

const store = useVoiceStore();
const storePokedex = usePokedexStore();
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

async function sendToGemini(text: string) {
  try { 

    text = toolDescription + text

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
    console.log(cleaned)
    let parsed = null;
    if (cleaned.includes('tool')) {
      parsed = JSON.parse(cleaned);
    } 
    if (parsed) {
      useTools(parsed);
    }else{
      store.setBotResponse(botReply);
    }
    
    
  } catch (error) {
    console.error(error);
    store.setBotResponse('Error al conectar con Gemini');
  }
}

async function useTools(parsed) {

  if(parsed.tool == 'getPokemonInfo'){
    const data = await getPokemonInfo(parsed.arguments.name); 
    storePokedex.setDataPokemon(data);
    store.setBotResponse(parsed.arguments.mensaje);
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
    <!-- Botón de grabación -->
    <v-btn
      :color="store.isRecording ? 'red' : 'blue'"
      class="ma-2"
      rounded
      block
      @click="toggleRecording"
    >
      {{ store.isRecording ? 'Detener' : 'Hablar' }}
    </v-btn>

    <!-- Sección de usuario -->
    <v-card class="pa-2 mb-2" color="grey lighten-3" outlined>
      <strong>Tú:</strong> {{ store.userSpeech || '...' }}
    </v-card>

    <!-- Sección del bot -->
    <v-card class="pa-2" color="green lighten-4" outlined>
      <strong>Pokedex:</strong> {{ store.botResponse || 'Esperando...' }}
    </v-card>
  </v-container>
</template>