type Props = {
  flagsMapping: { name: string; logo: string }[];
  currentLanguage: string;
  setLanguage: (lang: string) => void;
};

export const LangSelect = ({
  flagsMapping,
  currentLanguage,
  setLanguage,
}: Props) => {
  return (
    <>
      <h2 className="text-xl font-bold text-center text-blue-800 mb-2">
        Select language 👇
      </h2>
      <div className="space-y-2 mb-6">
        {flagsMapping.map((lang) => (
          <label
            key={lang.name}
            className="flex items-center space-x-2 text-lg font-semibold"
          >
            <input
              type="radio"
              name="language"
              value={lang.name}
              checked={currentLanguage === lang.name}
              onChange={(e) => setLanguage(e.target.value)}
            />
            <span>{lang.name}</span>
            <img
              src={lang.logo}
              alt={`${lang.name} flag`}
              className="w-6 h-4"
            />
          </label>
        ))}
      </div>
    </>
  );
};
