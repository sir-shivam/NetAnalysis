import React, { useContext, useEffect, useState } from 'react'
import Cauer1 from './Cauer1calculation';
import PolynomialContext from '../../context/PolynomialContext';
import CircuitDiagram from './drawCauer';

export default function Cauer1RL() {
  const [Cauer1RL, setCauer1RL] = useState([]);

  const {
    numCoeffs,
    denCoeffs,
    setFinalResult,
    parameterType
  } = useContext(PolynomialContext);

  useEffect(() => {
    let  result = [];
      if(numCoeffs.length <denCoeffs.length){
        result = Cauer1(denCoeffs , numCoeffs);
      }else{
        result = Cauer1(numCoeffs, denCoeffs );
      }
      // console.log(Yresult , "Cauer 1 RC using Y");
      const modifiedResults = result.map((component) => ({
        ...component,
        type: numCoeffs.length >= denCoeffs.length ?  (component.type === "R" ? "L" : "R" ) : (component.type === "R" ? "R" : "L" ) ,
        arrangement: numCoeffs.length < denCoeffs.length
          ?  component.arrangement
          : (component.arrangement === 'series' ? 'parallel' : 'series')// keep the original arrangement if numCoeffs >= DenCoeffs
      }));
      setCauer1RL(modifiedResults);
      setFinalResult([]);
      console.log(result, "cauer1 RC");
    
  }, [numCoeffs, denCoeffs, setFinalResult, parameterType]);


  

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
          Cauer 1 Synthesis
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
              <h2 className='text-center'>Cauer 1 RL Circuit </h2>
              {renderCircuit()}
            </div>
        </div>
      </div>
    </div>
  )
}



