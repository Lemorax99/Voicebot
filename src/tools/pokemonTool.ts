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
})
Tambien dispones de la siguiente herramienta:
- Nombre: sendPokemonInfo
- Descripción: Envia información sobre un Pokémon consultado anteriormente.
- Parámetros: { "data": "object" }
Esta se ejecutara cuando el usuario mencione enviame los datos de este pokemon, o algun dialogo parecido, deberas retornar un JSON con las siguientes caracteristicas:
{
  "tool": "sendPokemonInfo",
  "arguments": {}
})
Esto que sigue es lo que dijo el usuario: 
`;

