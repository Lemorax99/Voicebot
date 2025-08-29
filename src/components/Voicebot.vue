<script setup lang="ts">
import { ref } from 'vue';
import { useVoiceStore } from '../stores/voicebot';

const store = useVoiceStore();
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
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${import.meta.env.VITE_GEMINI_API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text }] }]
      })
    });

    const data = await response.json();
    // Gemini responde en data.candidates[0].content.parts[0].text
    const botReply = data?.candidates?.[0]?.content?.parts?.[0]?.text || 'No response';
    store.setBotResponse(botReply);
  } catch (error) {
    console.error(error);
    store.setBotResponse('Error al conectar con Gemini');
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
  <div class="p-4 max-w-md mx-auto space-y-4">
    <button
      @click="toggleRecording"
      class="px-4 py-2 rounded-full bg-blue-600 text-white w-full"
    >
      {{ store.isRecording ? 'Detener' : 'Hablar' }}
    </button>

    <div class="bg-gray-100 p-2 rounded">
      <strong>Tú:</strong> {{ store.userSpeech || '...' }}
    </div>

    <div class="bg-green-100 p-2 rounded">
      <strong>Bot:</strong> {{ store.botResponse || 'Esperando...' }}
    </div>
  </div>
</template>
