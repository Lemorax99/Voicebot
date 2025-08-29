import { defineStore } from 'pinia';

export const useVoiceStore = defineStore('voice', {
  state: () => ({
    userSpeech: '' as string,
    botResponse: '' as string,
    isRecording: false as boolean,
  }),
  actions: {
    setUserSpeech(text: string) {
      this.userSpeech = text;
    },
    setBotResponse(text: string) {
      this.botResponse = text;
    },
    setRecording(status: boolean) {
      this.isRecording = status;
    }
  }
});
