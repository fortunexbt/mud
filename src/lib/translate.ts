import { generateText } from "ai";
import { createOpenAI } from "@ai-sdk/openai";

export async function translateText(text: string, sourceLocale: string, targetLocale: string): Promise<{ text: string; success: boolean }> {
  const apiKey = process.env.OPENAI_API_KEY;
  
  if (!apiKey || !text.trim()) {
    return { text, success: false };
  }

  const openai = createOpenAI({ apiKey });
  
  const languageNames: Record<string, string> = {
    pt: "Portuguese (Brazil)",
    es: "Spanish",
    en: "English",
  };

  const sourceLang = languageNames[sourceLocale] || sourceLocale;
  const targetLang = languageNames[targetLocale] || targetLocale;

  try {
    const { text: translatedText } = await generateText({
      model: openai("gpt-4o-mini"),
      system: `You are a professional translator for a ceramics studio called "MUD Escola de Cerâmica".
      Translate the following text from ${sourceLang} to ${targetLang}.
      Maintain the tone, which is warm, artisanal, editorial, and sophisticated.
      Return ONLY the translated text, with no additional commentary, quotes, or markdown wrapping.`,
      prompt: text,
      temperature: 0.3,
    });

    return { text: translatedText.trim(), success: true };
  } catch (error) {
    console.error("Translation failed:", error);
    return { text, success: false }; // Fallback to original text on failure
  }
}
