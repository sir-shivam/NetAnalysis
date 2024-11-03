import React, { useContext, useEffect, useState } from 'react'
import PolynomialContext from '../../context/PolynomialContext';
import Cauer2 from './Cauer2Calculation';

export default function Cauer2LC() {
  const [Cauer2LC, setCauer2LC] = useState([]);

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
    finalResult,setFinalResult
  } = useContext(PolynomialContext);

    useEffect(() => {
      const result = Cauer2(numCoeffs , denCoeffs);

      const modifiedResults = result.map((component) => ({
        ...component,
        type : component.type === 'R' ? 'C' : 'L'
      }));
      setCauer2LC(modifiedResults);
      setFinalResult([]);
      console.log(modifiedResults, "cau1 RC")
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
  
            {Cauer2LC && (
              <div>
                <h2>{`Cauer 2 LC Results `}</h2>
                <ul>
                  {Cauer2LC.map((component, index) => (
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
              <h2>Cauer 2 LC Circuit </h2>



              {/* <canvas
                ref={canvasRef}
                width={600}
                height={300}
                style={{ border: "1px solid black" }}
              ></canvas> */}

    {/* write circuit  logc here  here i have doubt about the parrallel and series */}




            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
