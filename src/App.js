import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/homenew';
import Results from './components/Resultsnew';
// import Home from './comp/1stpage';
// import Results from './comp/Results';

function App() {
  const [showResults, setShowResults] = useState(false);

  const handleAnalyze = () => {
    setShowResults(true);
  };

  return (
    <Router>
      <div className="flex min-h-screen transition-all duration-500">
        {/* Left section with Home component */}
        <div
          className={`bg-blue-500 transition-all duration-500  ${
            showResults ? 'w-2/5 px-10' : 'w-full'
          }`}
        >
          <Home onAnalyze={handleAnalyze} />
        </div>

        {/* Right section with dynamic content (Results page) */}
        {showResults && (
          <div
            className="w-3/5 bg-white transition-transform duration-500 transform translate-x-0"
          >
            <Routes>
              <Route path="/" element={<Results />} />
            </Routes>
          </div>
        )}
      </div>
    </Router>
  );
}

export default App;
