import React, { useContext, useEffect, useState } from 'react'
import Cauer1 from './Cauer1calculation';
import PolynomialContext from '../../context/PolynomialContext';
import CircuitDiagram from './drawCauer';

export default function Cauer1RL() {
  const [Cauer1RL, setCauer1RL] = useState([]);

  const {
    numCoeffs,
    denCoeffs,
    setFinalResult
  } = useContext(PolynomialContext);

  useEffect(() => {
    if (numCoeffs && denCoeffs) {
      const result = Cauer1(numCoeffs, denCoeffs);
      const modifiedResults = result.map((component) => ({
        ...component,
        value : component.type == "R" ? 1/component.value : component.value  ,
        arrangement: component.arrangement === 'series' ? 'parallel' : 'series'
      }));
      setCauer1RL(modifiedResults);
      setFinalResult([]);
      console.log(result, "cauer1 RC");
    }
  }, [numCoeffs, denCoeffs, setFinalResult]);

  

  const renderCircuit = () => {
    if (Cauer1RL.length > 0) {
      return <CircuitDiagram cauerResult={Cauer1RL} />;
    }
    return null; // Render nothing until cauer1RC has values
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">
          Cauer 1 Analysis
        </h1>
        <div className="flex flex-col justify-center items-center ">
          <div className="bg-white p-6 rounded-lg shadow-md w-[60%] ">
            <h2 className="text-2xl font-bold mb-4">Results</h2>
  
            {Cauer1RL.length > 0 && (
              <div>
                <h2>Cauer 1 RL results</h2>
                <ul>
                  {Cauer1RL.map((component, index) => (
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
              <h2>Cauer 1 RL Circuit </h2>
              {renderCircuit()}
            </div>
        </div>
      </div>
    </div>
  )
}



