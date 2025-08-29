export async function askGemini(question: string): Promise<string> {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY; // define tu API key en .env
  const url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-goog-api-key": apiKey,
    },
    body: JSON.stringify({
      contents: [
        {
          parts: [
            { text: question }
          ]
        }
      ]
    })
  });

  if (!response.ok) {
    throw new Error(`Gemini API error: ${response.statusText}`);
  }

  const data = await response.json();

  // Extrae la respuesta de Gemini
  return data?.candidates?.[0]?.content?.parts?.[0]?.text || "Sin respuesta";
}
