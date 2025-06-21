//https://cdn.jsdelivr.net/npm/quran-cloud@1.0.0/dist/chapters/1.json

interface Verse {
  id: number;
  text: string;
  transliteration: string;
  translation: string;
}

interface ChapterData {
  id: number;
  name: string;
  transliteration: string;
  translation: string;
  type: string;
  verses: Verse[];
}

function randomChapter(): number {
  return Math.floor(Math.random() * 114) + 1;
}

function handleResponse(response: Response): Promise<ChapterData> {
  if (!response.ok) {
    console.error("Error fetching chapter:", response.statusText);
    return Promise.reject(new Error(response.statusText));
  }
  return response.json();
}

function handleError(error: Error): void {
  console.error("Error:", error.message);
}

function getChapter(
  chapterNumber: number,
  english: boolean
): Promise<ChapterData | void> {
  const URL = `https://cdn.jsdelivr.net/npm/quran-cloud@1.0.0/dist/chapters/${
    english ? "en/" : ""
  }${chapterNumber}.json`;

  console.log(URL);

  return fetch(URL).then(handleResponse).catch(handleError);
}

export { getChapter, randomChapter, type ChapterData, type Verse };
