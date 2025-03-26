type Props = {
  translation: string;
};

const TranslationResult = ({ translation }: Props) => {
  return (
    <div className="py-6 text-center">
      <h2 className="text-xl font-bold text-blue-800 mb-3">
        Your translation 👇
      </h2>
      <div className="w-full bg-gray-100 rounded-lg p-4 text-lg font-semibold text-black inline-block">
        {translation}
      </div>
    </div>
  );
};

export default TranslationResult;
