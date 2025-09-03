import { defineStore } from 'pinia';

export const useHistorialStore = defineStore('historial', {
  state: () => ({
    dataHistorial: [] as object
  }),
  actions: {
    setDataHistorial(json: object) {
      this.dataHistorial = json;
    }
  }
});
