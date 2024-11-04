import React, { useContext, useEffect, useState } from 'react'
import Cauer1 from './Cauer1calculation';
import PolynomialContext from '../../context/PolynomialContext';
import { Resistor } from '../elements/Resitor';
import { NewInductor } from '../elements/NewInductor';
import { NewCapacitor } from '../elements/NewCapacitor';
import { Capacitor } from '../elements/Capacitor';
import { NewResistor } from '../elements/NewResistor';
export default function Cauer1RC() {
  const [cauer1RC, setCauer1RC] = useState([]);
  let result= [];

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
    finalResult,
    setFinalResult

  } = useContext(PolynomialContext);

    useEffect(() => {
       result = Cauer1(numCoeffs , denCoeffs);
      setCauer1RC(result);
      setFinalResult([]);
      console.log(result , "cau1 RC")
    }, [])
     console.log(results);

    
    
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
  
            {cauer1RC && (
              <div>
                <h2>Cauer 1 RC results</h2>
                <ul>
                  {cauer1RC.map((component, index) => (
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
              <h2>Cauer 1 RC Circuit </h2>



              {}
              <svg width="600" height="300" style={{ border: '1px solid black' }}>
                {cauer1RC.map((component, index) => {
                  const xPosition = 50 + index * 100; // Horizontal position for each component

                  if (component.type === 'R') {
                    // Render a vertical resistor
                    return (
                      <g key={index} transform={`translate(${xPosition}, 100)`}>
                        <Resistor x={0} y={0} />
                        <text x="0" y="70" fontSize="12" textAnchor="middle" fill="black">
                          R={component.value.toFixed(2)}
                        </text>
                        <line x1={xPosition - 50} y1="100" x2={xPosition} y2="100" stroke="black" strokeWidth="2" />
                      </g>
                    );
                  } else if (component.type === 'L') {
                    // Render a horizontal capacitor
                    return (
                      <g key={index} transform={`translate(${xPosition}, 150)`}>
                        <NewInductor x={0} y={0} />
                        <text x="35" y="40" fontSize="12" textAnchor="middle" fill="black">
                          L={component.value.toFixed(2)} H
                        </text>
                        <line x1={xPosition - 140} y1="80" x2={xPosition-140} y2="100" stroke="black" strokeWidth="2" />
                        <line x1={xPosition -140} y1="100" x2={xPosition} y2="100" stroke="black" strokeWidth="2" />
                      </g>
                    );
                  }
                  return null;
                })}
              </svg>

    {}

     


            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
