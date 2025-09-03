export async function getPokemonInfo(name: string) {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
  if (!res.ok) throw new Error("No se encontró el Pokémon");
  return await res.json();
}

export async function savePokemonInfo(data: object) {
  const headers = new Headers()
    headers.append("Content-Type", "application/json") 

    const options = {
    method: "POST",
    headers,
    mode: "cors" as RequestMode,
    body: JSON.stringify(data),
    }

    const res = await fetch("https://eoa4yg74n5ok3g3.m.pipedream.net", options)
    if (!res.ok) throw new Error("No se pudo enviar");
    return await res.json();
}

export async function compararPokemonInfo(pokemon1: string,pokemon2: string,rasgo: string) {
   const resPokemon1 = await getPokemonInfo(pokemon1);
   const resPokemon2 = await getPokemonInfo(pokemon2); 
   let mensaje = '';

   if(rasgo == 'altura'){
    if(resPokemon1.height > resPokemon2.height){
      mensaje = resPokemon1.name + " es mas alto que " + resPokemon2.name;
    }else{
      mensaje = resPokemon2.name + " es mas alto que " + resPokemon1.name;
    }
   }else{
    if(resPokemon1.weight > resPokemon2.weight){
      mensaje = resPokemon1.name + " es mas alto que " + resPokemon2.name;
    }else{
      mensaje = resPokemon2.name + " es mas alto que " + resPokemon1.name;
    }
   }

   return mensaje;

}

export const toolDescription = `
necesito que sigas las instrucciones para simular una function calling(
Si el usuario te pregunta o dice cualquier cosa que no tenga nada que ver con pokemon decir que solo eres un pokedex o algo creativo referente.
Dispones de la siguiente herramienta:
- Nombre: getPokemonInfo
- Descripción: Devuelve información sobre un Pokémon usando su nombre.
- Parámetros: { "name": "string" }
Cuando el usuario te pida información sobre un Pokémon especifico (que te de nombre), responde solamente el siguiente json sin agregar mas texto solo sustituyendo el nombre del pokemon por <nombre>,
y añade un mensaje generico de que estamos mostrando lo solicitado a la derecha, algo humoristico o divertido:
{
  "tool": "getPokemonInfo",
  "arguments": { "name": "<nombre>", "mensaje":<mensaje> }
}
Tambien dispones de la siguiente herramienta:
- Nombre: sendPokemonInfo
- Descripción: Envia información sobre un Pokémon consultado anteriormente.
- Parámetros: { "data": "object" }
Esta se ejecutara cuando el usuario mencione enviame los datos de este pokemon, o algun dialogo parecido, deberas retornar un JSON con las siguientes caracteristicas:
{
  "tool": "sendPokemonInfo",
  "arguments": {}
}
Tambien dispondremos de una funcionalidad para comparar pokemones, en la cual si detectas que te das nombre de dos pokemon diferentes y algun rasgo como peso o altura,
debes devolverme el siguiente json, asiganando cada nombre del pokemon en <pokemon1> y <pokemon2>, tambien sustituye <rasgo> por el rago a comparar (altura,peso)
{
  "tool": "compararPokemonInfo",
  "arguments": { "pokemon1": "<pokemon1>","pokemon2": "<pokemon2>", "rasgo":<rasgo> }
}
Esto que sigue es lo que dijo el usuario: 
`;

