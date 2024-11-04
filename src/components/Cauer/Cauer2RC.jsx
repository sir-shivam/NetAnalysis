import React, { useContext, useEffect, useState } from 'react'
import PolynomialContext from '../../context/PolynomialContext';
import Cauer2 from './Cauer2Calculation';
import { Resistor } from '../elements/Resitor';
import { NewInductor } from '../elements/NewInductor';
import { NewCapacitor } from '../elements/NewCapacitor';
import { Capacitor } from '../elements/Capacitor';
import { NewResistor } from '../elements/NewResistor';
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

    <svg width="600" height="300" style={{ border: '1px solid black' }}>
                {cauer2RC.map((component, index) => {
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


            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
