import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import SurprisePage from './pages/SurprisePage.jsx';
import NotFound from './pages/NotFound.jsx';

function AppPreviewOnly() {
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  return (
    <div className={`min-h-screen transition-colors duration-500 ${darkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-slate-900'}`}>
      <BrowserRouter>
        <main className="mx-auto max-w-7xl px-4 pb-16 pt-6 sm:px-6 lg:px-8">
          <Routes>
            <Route path="/preview" element={<SurprisePage />} />
            <Route path="/" element={<SurprisePage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  );
}

export default AppPreviewOnly;
