import React, { useContext, useEffect, useState } from 'react'
import PolynomialContext from '../../context/PolynomialContext';
import CircuitDiagram from './drawCauer';
import Cauer2 from './Cauer2Calculation';

export default function Cauer2RL() {
  const [Cauer2RL, setCauer2RL] = useState([]);

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
        type : component.type == "C" ? "R" : "C",
        arrangement: component.arrangement === 'series' ? 'parallel' : 'series'
      }));
      setCauer2RL(modifiedResults);
      setFinalResult([]);
      console.log(result, "cauer1 RC");
    }
  }, [numCoeffs, denCoeffs, setFinalResult]);

  

  const renderCircuit = () => {
    if (Cauer2RL.length > 0) {
      return <CircuitDiagram cauerResult={Cauer2RL} />;
    }
    return null; // Render nothing until cauer1RC has values
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">
          Cauer 1 Analysis
        </h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Results</h2>
  
            {Cauer2RL.length > 0 && (
              <div>
                <h2>Cauer 1 RC results</h2>
                <ul>
                  {Cauer2RL.map((component, index) => (
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
              <h2>Cauer 1 RL Circuit </h2>
              {renderCircuit()}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}



