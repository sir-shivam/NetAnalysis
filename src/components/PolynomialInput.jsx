// src/components/PolynomialInput.js
import React from 'react';

const PolynomialInput = ({ numerator, denominator, setNumerator, setDenominator, onAnalyze }) => {
  return (
   <div className=''>
     <div className="max-w-2xl mx-auto p-6 bg-black rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Polynomial Circuit Analysis</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Numerator Coefficients</label>
          <input
            type="text"
            value={numerator}
            onChange={(e) => setNumerator(e.target.value)}
            placeholder="Enter coefficients (comma-separated)"
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Denominator Coefficients</label>
          <input
            type="text"
            value={denominator}
            onChange={(e) => setDenominator(e.target.value)}
            placeholder="Enter coefficients (comma-separated)"
            className="w-full p-2 border rounded"
          />
        </div>
        <button
          onClick={onAnalyze}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Analyze
        </button>
      </div>
    </div>
   </div>
  );
};

export default PolynomialInput;