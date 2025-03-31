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
        content: `You are an expert multilingual translator with native-level fluency in all major languages.
                  When a user provides a text and a target language, translate the text accurately and concisely,
                  preserving tone, context, and meaning. Prioritize natural, idiomatic phrasing over word-for-word
                  translation. Only provide the translated text, unless additional clarification is requested.`,
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
