import Ayahs from "./components/ayahs";

function App() {
  return (
    <div className="h-screen flex flex-col">
      <div className="flex-1 flex items-center justify-center">
        <Ayahs />
      </div>

      <div className="mb-4 flex justify-center">
        Made by{"\u00A0"}
        <a href="/" className="text-secondary">
          Ibn-H
        </a>
      </div>
    </div>
  );
}

export default App;
