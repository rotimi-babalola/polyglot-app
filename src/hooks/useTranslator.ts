import { useState } from "react";
import OpenAI from "openai";

type TranslateTextProps = {
  text: string;
  targetLanguage: string;
};

export const useTranslator = () => {
  const [text, setText] = useState("");
  const [translation, setTranslation] = useState("");
  const [language, setLanguage] = useState("French");
  const [error, setError] = useState("");

  const openai = new OpenAI({
    apiKey: import.meta.env.VITE_OPEN_AI_API_KEY,
    // TODO: remove this in production
    dangerouslyAllowBrowser: true,
  });

  const [isLoading, setIsLoading] = useState(false);

  const translateText = async ({
    text,
    targetLanguage,
  }: TranslateTextProps) => {
    setIsLoading(true);
    try {
      const completion = await openai.chat.completions.create({
        messages: [
          {
            role: "system",
            content:
              "You are an expert language translator. You translate the text the user gives to the language they specify. Always give concise and accurate translations.",
          },
          {
            role: "user",
            content: `Translate this text to ${targetLanguage}: ${text}`,
          },
        ],
        model: "gpt-4o",
      });

      if (completion.choices[0].message.content) {
        setTranslation(completion.choices[0].message.content);
      }
    } catch {
      setError("An error occurred while translating the text");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    text,
    setText,
    translation,
    language,
    setLanguage,
    translateText,
    setTranslation,
    error,
    setError,
  };
};
