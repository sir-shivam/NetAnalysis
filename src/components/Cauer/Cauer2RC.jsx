import React, { useContext, useEffect, useState } from 'react'
import PolynomialContext from '../../context/PolynomialContext';
import CircuitDiagram from './drawCauer';
import Cauer2 from './Cauer2Calculation';

export default function Cauer2RC() {
  const [Cauer2RC, setCauer2RC] = useState([]);

  const {
    numCoeffs,
    denCoeffs,
    setFinalResult
  } = useContext(PolynomialContext);

  useEffect(() => {
    if (numCoeffs && denCoeffs) {
      const result = Cauer2(numCoeffs, denCoeffs);
      const modifiedResults = result.map((component) => ({
        ...component,
        type : component.type === "R" ? "C" : "R",
        value : 1/component.value,
        
      }));
      setCauer2RC(modifiedResults);
      setFinalResult([]);
      console.log(result, "cauer1 RC");
      console.log(modifiedResults, "cauer1 RC");
    }
  }, [numCoeffs, denCoeffs, setFinalResult]);

  const renderCircuit = () => {
    if (Cauer2RC.length > 0) {
      return <CircuitDiagram cauerResult={Cauer2RC} />;
    }
    return null; // Render nothing until Cauer2RC has values
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">
          Cauer 2 Analysis
        </h1>
        <div className="flex flex-col justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-md w-[60%] ">
            <h2 className="text-2xl font-bold mb-4">Results</h2>
  
            {Cauer2RC.length > 0 && (
              <div>
                <h2>Cauer 2 RC results</h2>
                <ul>
                  {Cauer2RC.map((component, index) => (
                    <li key={index}>
                      <strong>Type:</strong> {component.type},
                      <strong> Value:</strong> {component.value.toFixed(4)},
                      <strong> Arrangement:</strong> {component.arrangement}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
          </div>
          <div>
              <h2>Cauer 2 RC Circuit </h2>
              {renderCircuit()}
            </div>
        </div>
      </div>
    </div>
  )
}
