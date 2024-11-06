import React, { useState, useEffect, useContext } from 'react';
import { Resistor } from './elements/Resitor';
import { Inductor } from './elements/Inductor';
import PolynomialContext from '../context/PolynomialContext';

const Foster1RLSynthesis = ({ terms }) => {
  const [networkElements, setNetworkElements] = useState([]);
const {finalResult,setFinalResult , numCoeffs,denCoeffs,parameterType, } = useContext(PolynomialContext);

  const synthesizeFoster2 = (terms) => {
    const elements = [];

    console.log(terms , "RL");

    
    terms.forEach((term) => {
      if(term.coefficient!==0){
        if ((term.type === 'polynomial' && term.power === 0 ) || term.root === 0  ) {
          elements.push({ type: 'resistor', value: term.coefficient, position: 'series' });
        } else if (term.type === 'simple_pole' && term.power === 1) {
          elements.push({ type: 'inductor', value:  term.coefficient, position: 'series' });
        } else if (term.type === 'simple_pole') {
          elements.push({
            type: 'resonant_pair',
            R: term.coefficient ,
            L:  -((term.coefficient)/(term.root)),
            position: 'parallel'
          });
        }
      }
    });

    console.log("hii",elements);
    return elements;
  };

  useEffect(() => {
    if (terms && terms.length > 0) {
      const synthesizedElements = synthesizeFoster2(terms);
      setNetworkElements(synthesizedElements);
      setFinalResult(synthesizedElements);
    }
  }, [terms , numCoeffs , denCoeffs , parameterType]);

  return (
    <div className="w-full max-w-2xl  rounded-lg p-6 shadow-sm">
      <h3 className="text-2xl font-semibold mb-6">Foster1 RL Network Synthesis</h3>
      
      <svg width="800" height="300">
        {networkElements.map((element, index) => {
          const xPosition = 80 + index * 160;

          return (
            <g key={index}>
              {/* Series Inductor or Capacitor */}
              {element.type === 'resistor' && (
                <>
                  <Resistor x={xPosition} y="120" />
                  {/* Connect line from left side */}
                  <div>hello</div>
                  <line x1={xPosition - 60} y1="120" x2={xPosition} y2="120" stroke="black" strokeWidth="2" />
                  {/* Connect line to next element */}
                  <line x1={xPosition + 50} y1="120" x2={xPosition + 110} y2="120" stroke="black" strokeWidth="2" />
                  <text x={xPosition+10} y="150" fontSize="12" fill="black">R={element.value.toFixed(2)} ohms</text>
                </>
              )}

              {element.type === 'inductor' && (
                <>
                  <Inductor x={xPosition} y="100" />
                  {/* Connect line from left side */}
                  <line x1={xPosition - 60} y1="120" x2={xPosition} y2="120" stroke="black" strokeWidth="2" />
                  {/* Connect line to next element */}
                  <line x1={xPosition + 10} y1="120" x2={xPosition + 100} y2="120" stroke="black" strokeWidth="2" />
                  <text x={xPosition+10} y="90" fontSize="12" fill="black">L={element.value.toFixed(2)}</text>
                </>
              )}

              {/* Parallel Resonant LC Pair */}
              {element.type === 'resonant_pair' && (
                <>
                  {/* Inductor in parallel */}
                  <Resistor x={xPosition} y="80" />
                  <line x1={xPosition - 50} y1="80" x2={xPosition} y2="80" stroke="black" strokeWidth="2" />
                  <line x1={xPosition + 50} y1="80" x2={xPosition + 100} y2="80" stroke="black" strokeWidth="2" />
                  <text x={xPosition+20} y="60" fontSize="12" fill="black">R={element.R.toFixed(2)} ohms</text>
                  {/* Capacitor in parallel, below the inductor */}
                  <Inductor x={xPosition} y="150" />
                  <line x1={xPosition - 50} y1="160" x2={xPosition} y2="160" stroke="black" strokeWidth="2" />
                  <line x1={xPosition+50} y1="160" x2={xPosition +100} y2="160" stroke="black" strokeWidth="2" />
                  <text x={xPosition+20} y="180" fontSize="12" fill="black">L={element.L.toFixed(2)} H</text>
                  {/* Connect the two parallel elements */}
                  <line x1={xPosition-50} y1="80" x2={xPosition-50} y2="160" stroke="black" strokeWidth="2" />
                  <line x1={xPosition +100} y1="120" x2={xPosition + 110} y2="120" stroke="black" strokeWidth="2" />
                  <line x1={xPosition + 100} y1="80" x2={xPosition + 100} y2="160" stroke="black" strokeWidth="2" />
                </>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
};

export default Foster1RLSynthesis;
