import React, { useContext, useEffect, useState } from 'react'
import PolynomialContext from '../../context/PolynomialContext';
import Cauer2 from './Cauer2Calculation';

export default function Cauer2RC() {
  const [cauer2RC, setCauer2RC] = useState([]);

  const {
    numCoeffs,
    setNumCoeffs,
    denCoeffs,
    setDenCoeffs,

    // Results
    foster1Results,
    setFoster1Results,
    foster2Results,
    setFoster2Results,
    cauer1Results,
    setCauer1Results,
    cauer2Results,
    setCauer2Results,

    // Method selection
    currentMethod,
    setCurrentMethod,

    // Status
    isAnalyzing,
    setIsAnalyzing,
    results,
    setResults,
    error,
    setError,
  } = useContext(PolynomialContext);

    useEffect(() => {
      const result = Cauer2(numCoeffs , denCoeffs);
      setCauer2RC(result);
      console.log(result , "cau2 RC")
    }, [])
    
  return(
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">
          Cauer 1 Analysis
        </h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            {/* Add Cauer 1 results display here */}
            <h2 className="text-2xl font-bold mb-4">Results</h2>
  
            {cauer2RC && (
              <div>
                <h2>Cauer 2 RC results</h2>
                <ul>
                  {cauer2RC.map((component, index) => (
                    <li key={index}>
                      <strong>Type:</strong> {component.type},
                      <strong> Value:</strong> {component.value.toFixed(4)},
                      <strong> Arrangement:</strong> {component.arrangement}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div>
              <h2>Cauer 2 RC Circuit </h2>



              {/* <canvas
                ref={canvasRef}
                width={600}
                height={300}
                style={{ border: "1px solid black" }}
              ></canvas> */}

    {/* write circuit  logc here   */}




            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
