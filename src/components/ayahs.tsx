import { getChapter, randomChapter, type Verse } from "../utils/ayahsProvider";
import { useState } from "react";

const INITIAL_VERSE = {
  inArabic: "بسم الله الرحمن الرحيم",
  transliteration: "Bismillāhi r-raḥmāni r-raḥīm",
  translation: "In the Name of Allah—the Most Compassionate, Most Merciful.",
  page: "1:1",
};

function Ayahs() {
  const [verse, setVerse] = useState(INITIAL_VERSE);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchData = async () => {
    setLoading(true);
    setError("");
    try {
      const chapter = randomChapter();
      const data = await getChapter(chapter, false);
      if (!data) {
        setError("Could not fetch chapter.");
        setLoading(false);
        return;
      }
      const verses = Object.keys(data.verses).length;
      const randomVerseIndex = Math.floor(Math.random() * verses);
      const randomVerse: Verse = data.verses[randomVerseIndex];
      const englishData = await getChapter(chapter, true);

      if (!englishData) {
        setError("Could not fetch translation.");
        setLoading(false);
        return;
      }

      const translation = englishData.verses[randomVerseIndex].translation;
      setVerse({
        inArabic: randomVerse.text,
        transliteration: randomVerse.transliteration,
        translation: translation,
        page: `${chapter}:${randomVerseIndex + 1}`,
      });
    } catch (e) {
      setError("Something went wrong while fetching the data.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[60vh]">
      <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl p-8 w-full max-w-[900px] border border-white/20 relative transition-all duration-300">
        {error && (
          <div className="text-red-400 mb-4 text-base font-medium">{error}</div>
        )}
        <div
          className="text-white text-5xl md:text-6xl font-bold mb-6 leading-relaxed drop-shadow-lg"
          dir="rtl"
          style={{ fontFamily: "Amiri, serif" }}
        >
          {verse.inArabic}
        </div>
        <div className="text-primary-200 text-lg md:text-xl italic mb-4 font-medium tracking-wide">
          {verse.transliteration}
        </div>
        <div className="text-white text-lg md:text-xl mb-6 font-light bg-black/20 rounded px-4 py-2 inline-block shadow-sm">
          {verse.translation}
        </div>
        <div className="text-primary-300 text-base md:text-lg mb-8 font-semibold">
          {verse.page}
        </div>
        <div className="flex justify-center">
          <button
            onClick={fetchData}
            className="bg-primary text-white w-14 h-14 md:w-16 md:h-16 rounded-full text-2xl cursor-pointer font-bold shadow-lg hover:scale-105 hover:shadow-xl hover:bg-secondary transition-all duration-200 disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2"
            aria-label="Toon een willekeurige ayah"
            disabled={loading}
          >
            <div className="flex items-center justify-center h-full">
              {loading ? (
                <svg
                  className="animate-spin h-7 w-7 text-white"
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
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8z"
                  ></path>
                </svg>
              ) : (
                <i className="fa-solid fa-arrow-right text-3xl"></i>
              )}
            </div>
          </button>
        </div>
        {loading && (
          <div className="absolute inset-0 bg-black/30 rounded-2xl flex items-center justify-center transition-opacity duration-200">
            <span className="text-white text-lg font-medium animate-pulse">
              Please be patient...
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export default Ayahs;
