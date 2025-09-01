import { defineStore } from 'pinia';

export const usePokedexStore = defineStore('pokedex', {
  state: () => ({
    dataPokemon: {"sprites":{"front_default":""},"name":""} as object
  }),
  actions: {
    setDataPokemon(json: object) {
      this.dataPokemon = json;
    }
  }
});
