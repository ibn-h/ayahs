function Ayahs() {
  return (
    <div className="text-center">
      <div className="text-white text-4xl mb-2">بسم الله الرحمن الرحيم</div>
      <div className="text-gray-400 text-xl mb-2">
        Bismillāhi r-raḥmāni r-raḥīm
      </div>
      <div className="text-gray-400 text-lg mb-5">
        (In the Name of Allah—the Most Compassionate, Most Merciful.)
      </div>
      <button className="bg-primary text-white w-12 h-12 rounded-full text-xl cursor-pointer font-medium shadow-custom hover:bg-secondary transition-colors duration-300">
        <div className="flex items-center justify-center h-full">
          <i className="fa-solid fa-arrow-right text-2xl"></i>
        </div>
      </button>
    </div>
  );
}

export default Ayahs;
