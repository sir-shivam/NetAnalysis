import React, { useState, useEffect } from 'react';
import { Inductor } from './elements/Inductor';
import { Capacitor } from './elements/Capacitor';
import { limitAsSTendsToInfinity } from './LimitFinding';
const FosterSynthesis1LC = ({ terms }) => {
  const [networkElements, setNetworkElements] = useState([]);

  const synthesizeFoster1 = (terms) => {
    const elements = [];
    console.log(terms , "terms in LC")
    
    

    
    terms.forEach((term) => {
   if(term.coefficient!==0){
    if (term.type === 'polynomial' && term.power === 0) {
      elements.push({ type: 'inductor', value: term.coefficient, position: 'series' });
    } else if (term.type === 'simple_pole' && term.root === 0) {
      elements.push({ type: 'capacitor', value: 1 / term.coefficient, position: 'series' });
    } else if (term.type === 'simple_pole') {
      elements.push({
        type: 'resonant_pair',
        L: -(term.coefficient /(term.root)),
        C: 1 / term.coefficient,
        position: 'parallel'
      });
    }
   }
    });
    console.log("lC", elements);
    return elements;
  };

  useEffect(() => {
    if (terms && terms.length > 0) {
      const synthesizedElements = synthesizeFoster1(terms);
      setNetworkElements(synthesizedElements);
    }
  }, [terms]);

  return (
    <div className="w-full max-w-2xl  rounded-lg p-6 ">
      <h3 className="text-2xl font-semibold mb-6">Foster Form 1 Network Synthesis</h3>
      
      <svg width="800" height="300">
        {networkElements.map((element, index) => {
          const xPosition = 80 + index * 160;

          return (
            <g key={index}>
              {/* Series Inductor or Capacitor */}
              {element.type === 'inductor' && (
                <>
                  <Inductor x={xPosition} y="110" />
                  {/* Connect line from left side */}
                  <line x1={xPosition - 60} y1="120" x2={xPosition} y2="120" stroke="black" strokeWidth="2" />
                  {/* Connect line to next element */}
                  <line x1={xPosition + 50} y1="120" x2={xPosition + 110} y2="120" stroke="black" strokeWidth="2" />
                  <text x={xPosition+10} y="150" fontSize="12" fill="black">L={element.value.toFixed(2)}H</text>
                </>
              )}

              {element.type === 'capacitor' && (
                <>
                  <Capacitor x={xPosition} y="100" />
                  {/* Connect line from left side */}
                  <line x1={xPosition - 60} y1="120" x2={xPosition} y2="120" stroke="black" strokeWidth="2" />
                  {/* Connect line to next element */}
                  <line x1={xPosition + 10} y1="120" x2={xPosition + 100} y2="120" stroke="black" strokeWidth="2" />
                  <text x={xPosition+10} y="90" fontSize="12" fill="black">C={element.value.toFixed(2)}F</text>
                </>
              )}

              {/* Parallel Resonant LC Pair */}
              {element.type === 'resonant_pair' && (
                <>
                  {/* Inductor in parallel */}
                  <Inductor x={xPosition} y="70" />
                  <line x1={xPosition - 50} y1="80" x2={xPosition} y2="80" stroke="black" strokeWidth="2" />
                  <line x1={xPosition + 50} y1="80" x2={xPosition + 100} y2="80" stroke="black" strokeWidth="2" />
                  <text x={xPosition+20} y="60" fontSize="12" fill="black">L={element.L.toFixed(2)}H</text>
                  {/* Capacitor in parallel, below the inductor */}
                  <Capacitor x={xPosition} y="140" />
                  <line x1={xPosition - 50} y1="160" x2={xPosition} y2="160" stroke="black" strokeWidth="2" />
                  <line x1={xPosition+10} y1="160" x2={xPosition +100} y2="160" stroke="black" strokeWidth="2" />
                  <text x={xPosition+20} y="180" fontSize="12" fill="black">C={element.C.toFixed(2)}F</text>
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

export default FosterSynthesis1LC;
