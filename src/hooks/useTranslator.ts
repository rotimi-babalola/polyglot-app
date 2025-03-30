import { useState } from "react";

type TranslateTextProps = {
  text: string;
  targetLanguage: string;
};

const WORKER_URL = "https://openai-api-worker.tolurotimi.workers.dev/";

export const useTranslator = () => {
  const [text, setText] = useState("");
  const [translation, setTranslation] = useState("");
  const [language, setLanguage] = useState("French");
  const [error, setError] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const translateText = async ({
    text,
    targetLanguage,
  }: TranslateTextProps) => {
    setIsLoading(true);

    const messages = [
      {
        role: "system",
        content:
          "You are an expert language translator. You translate the text the user gives to the language they specify. Always give concise and accurate translations.",
      },
      {
        role: "user",
        content: `Translate this text to ${targetLanguage}: ${text}`,
      },
    ];

    try {
      const request = await fetch(WORKER_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(messages),
      });

      const data = await request.json();

      if (!request.ok) {
        throw new Error(`Worker Error: ${data.error}`);
      }

      setTranslation(data.content);
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
