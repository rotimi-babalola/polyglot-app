import { LangSelect } from "./lang-select";

import frLogo from "../assets/french-flag.svg";
import ESFlag from "../assets/spanish-flag.svg";
import JPFlag from "../assets/japanese-flag.svg";
import headerLogo from "../assets/parrot-mascot.png";
import TranslationResult from "./translation-result";
import { useTranslator } from "../hooks/useTranslator";

interface Flag {
  logo: string;
  name: string;
}

const flagsMapping: Flag[] = [
  { logo: frLogo, name: "French" },
  { logo: ESFlag, name: "Spanish" },
  { logo: JPFlag, name: "Japanese" },
];

export const PollyGlotTranslator = () => {
  const {
    isLoading,
    text,
    setText,
    translation,
    language,
    setLanguage,
    translateText,
    setTranslation,
  } = useTranslator();

  const renderContent = () => {
    if (translation) {
      return <TranslationResult translation={translation} />;
    }

    if (!isLoading) {
      return (
        <LangSelect
          flagsMapping={flagsMapping}
          currentLanguage={language}
          setLanguage={setLanguage}
        />
      );
    }

    return null;
  };

  const handleClick = () => {
    if (translation) {
      setText("");
      setTranslation("");
      return;
    }

    translateText({ text, targetLanguage: language });
  };

  const buttonText = isLoading
    ? "Translating..."
    : translation
    ? "Start over"
    : "Translate";

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden font-sans">
      <div className="bg-navyBlue text-white p-6 relative">
        <div className="flex items-center space-x-4">
          <img src={headerLogo} alt="Parrot mascot" />
        </div>
      </div>

      <div className="p-6 border rounded-b-lg">
        <h2 className="text-xl font-bold text-center text-blue-800 mb-2">
          Text to translate 👇
        </h2>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full p-4 border rounded-md bg-gray-100 text-gray-800 mb-4 resize-none"
          rows={3}
        />

        {renderContent()}

        <button
          onClick={handleClick}
          disabled={isLoading}
          className={`w-full flex justify-center items-center gap-2 bg-blue-700 text-white text-lg font-bold py-2 rounded transition ${
            isLoading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-800"
          }`}
        >
          {isLoading && (
            <svg
              className="animate-spin h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
          )}
          {buttonText}
        </button>
      </div>
    </div>
  );
};
