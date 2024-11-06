import React, { useContext, useEffect, useState } from 'react';
import PolynomialContext from '../context/PolynomialContext';
import findRootsAberth from './Rootfind';
import FosterCalculation from './FosterCalculation';

import Foster1RLSynthesis from './Foster1RL';
import Foster1RCSynthesis from './Foster1RC';
import Foster2RLSynthesis from './Foster2RL';
import Foster2RCSynthesis from './Foster2RC';

import Cauer1RL from './Cauer/Cauer1RL';
import Cauer1LC from './Cauer/Cauer1LC';
import Cauer1RC from './Cauer/Cauer1RC';
import Cauer2LC from './Cauer/Cauer2LC';
import Cauer2RC from './Cauer/Cauer2RC';
import Cauer2RL from './Cauer/Cauer2RL';
import FosterSynthesis1LC from './FosterLC';
import Foster2SynthesisLC from './Foster2LC';

export default function Results() {
  const [design, setDesign] = useState("");
  const [terms, setTerms] = useState([]);
  const [terms2, setTerms2]= useState([]);
  const {
    numCoeffs,
    denCoeffs,
    roots,
    setRoots,
    finding,
    parameterType,
    finalResult,
    numRoot,setNumRoot,denRoot,setDenRoot
  } = useContext(PolynomialContext);

  useEffect(() => {
    console.log(denCoeffs , "den");
    const rootFound = findRootsAberth(denCoeffs);
    const rootFound2 = findRootsAberth(numCoeffs);
    setNumRoot(rootFound2);
    setDenRoot(rootFound);

    setRoots(rootFound);
    console.log(rootFound2 , "roots2")
    
    const termsFound = FosterCalculation(numCoeffs, denCoeffs, rootFound);
    setTerms(termsFound);

    console.log(termsFound , "after ")
    const termsFound2 = FosterCalculation(denCoeffs,numCoeffs,rootFound2);
    console.log(termsFound2 , "term2");
    setTerms2(termsFound2);
  }, [numCoeffs, denCoeffs]);

  // Function to handle synthesis options based on finding and parameter type
  const renderSynthesisOptions = () => {
    const options = [];
    const addOption = (label, value) =>
      options.push(
        <button
          key={value}
          className="px-4 py-2 border hover:bg-blue-500 hover:text-white rounded-md hover:ring-2 hover:ring-blue-900 border-gray-500 bg-white "
          onClick={() => setDesign(value)}
        >
          {label}
        </button>
      );

      console.log(finding);
    


    if (finding.component === "LC" ) {
      if(parameterType === "z"){
        addOption("Foster1LC", "Foster1LC");
        addOption("Cauer1 LC", "Cauer1LC");
        addOption("Cauer2 LC", "Cauer2LC");
      }
      else{
        addOption("Cauer1 LC", "Cauer1LC");
        addOption("Cauer2 LC", "Cauer2LC");
        addOption("Foster2LC", "Foster2LC");
      }
    } else {
        if (parameterType === "z") {
          addOption("Foster1RC", "Foster1RC");
          addOption("Foster2RL", "Foster2RL");
          addOption("Cauer1RC", "Cauer1RC");
          addOption("Cauer2RC", "Cauer2RC");
        } else {
          addOption("Foster1RL", "Foster1RL");
          addOption("Foster2RC", "Foster2RC");
          addOption("Cauer1RL", "Cauer1RL");
          addOption("Cauer2RL", "Cauer2RL");
        }
        if (parameterType === "z") {
          addOption("Foster1RL", "Foster1RL");
          addOption("Foster2RC", "Foster2RC");
          addOption("Cauer1RL", "Cauer1RL");
          addOption("Cauer2RL", "Cauer2RL");
        } else {
          addOption("Foster1RC", "Foster1RC");
          addOption("Foster2RL", "Foster2RL");
          addOption("Cauer1RC", "Cauer1RC");
          addOption("Cauer2RC", "Cauer2RC");
        }
    }

    return options;
  };

  // Render the selected circuit synthesis component
  const renderCircuit = () => {
    switch (design) {
     
      case "Cauer1LC":
        return <Cauer1LC />;
      case "Cauer2LC":
        return <Cauer2LC />;
      case "Foster1RC":
        return <Foster1RCSynthesis terms={parameterType==='z'?terms:terms2}/>;
      case "Foster2RC":
        return <Foster2RCSynthesis terms={parameterType==='y'?terms:terms2} />;
      case "Cauer1RC":
        return <Cauer1RC />;
      case "Cauer2RC":
        return <Cauer2RC />;
      case "Foster1RL":
        return <Foster1RLSynthesis terms={parameterType==='z'?terms:terms2} />;
      case "Foster2RL":
        return <Foster2RLSynthesis terms={parameterType==='y'?terms:terms2} />;
      case "Cauer1RL":
        return <Cauer1RL />;
      case "Cauer2RL":
        return <Cauer2RL />;
      case "Foster1LC":
        return <FosterSynthesis1LC terms={parameterType==='z'?terms:terms2}/>
      case "Foster2LC":
        return <Foster2SynthesisLC terms={parameterType==='y'?terms:terms2}/>
      default:
        return <p>Select a circuit design to see the synthesis result.</p>;
    }
  };

  return (
    <div className="p-6 space-y-4 bg-blue-400">
      <h2 className="text-2xl font-semibold">Analysis Results</h2>
      <p className="text-gray-200">Circuit analysis results and synthesis options</p>
      
      <div>
        <h3 className="font-medium pb-5">Synthesis Options:</h3>
        <div className="flex flex-wrap gap-2">{renderSynthesisOptions()}</div>
      </div>
      
      <h2 className="text-2xl font-bold mb-4">Results</h2>

      {finalResult && (
        <div>
          <h2>{`${design} Results`}</h2>
          <ul className='text-slate-800'>
            {finalResult.map((component, index) => (
              <li key={index}>
                <strong>Type:</strong> {component.type},
                <strong> Value:</strong>{" "}
                {component.type === "resonant_pair"
                  ? `R: ${component.R.toFixed(4)}, C: ${component.C}`
                  : component.value.toFixed(4)},
                <strong> Arrangement:</strong> {component.position}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="overflow-y-auto h-[60.8vh] bg-white rounded-xl ">
        
        {renderCircuit()}
      </div>
    </div>
  );
}
