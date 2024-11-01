import React, { useState } from 'react';
// import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';

import Cauer1 from './components/Cauer1';
import Cauer2 from './components/Cauer2';
import HomePage from './components/Home';

  
const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/result" element={<Cauer2 />} />
          <Route path="/result2" element={<Cauer1/>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;



  // export default App;