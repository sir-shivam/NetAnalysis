// src/components/AnalysisResults.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const AnalysisResults = () => {
  const navigate = useNavigate();
  
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Analysis Methods</h2>
      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={() => navigate('/foster1')}
          className="p-4 bg-white rounded-lg shadow hover:shadow-lg transition-shadow"
        >
          Foster 1
        </button>
        <button
          onClick={() => navigate('/foster2')}
          className="p-4 bg-white rounded-lg shadow hover:shadow-lg transition-shadow"
        >
          Foster 2
        </button>
        <button
          onClick={() => navigate('/cauer1')}
          className="p-4 bg-white rounded-lg shadow hover:shadow-lg transition-shadow"
        >
          Cauer 1
        </button>
        <button
          onClick={() => navigate('/cauer2')}
          className="p-4 bg-white rounded-lg shadow hover:shadow-lg transition-shadow"
        >
          Cauer 2
        </button>
      </div>
    </div>
  );
};

export default AnalysisResults;