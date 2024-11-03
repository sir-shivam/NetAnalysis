import React, { useState, useEffect } from 'react';
// import {Inductor} from '../elements/Inductor';
// import { Capacitor } from '../elements/Capacitor';
// import { Resistor } from '../elements/Resitor';
import { NewCapacitor } from './elements/NewCapacitor';
import { Resistor } from './elements/Resitor';
import { Capacitor } from './elements/Capacitor';
const Foster1RCSynthesis = ({ terms }) => {
  const [networkElements, setNetworkElements] = useState([]);
  

  const synthesizeFoster1 = (terms) => {
    const elements = [];
    
    terms.forEach((term) => {
      if (term.type === 'polynomial' && term.power === 0) {
        elements.push({ type: 'resistor', value: term.coefficient, position: 'series' });
      } else if (term.type === 'simple_pole' && term.root === 0) {
        elements.push({ type: 'capacitor', value: 1 / term.coefficient, position: 'series' });
      } else if (term.type === 'simple_pole') {
        elements.push({
          type: 'resonant_pair',
          R: term.coefficient ,
          C: 1 / term.coefficient,
          position: 'parallel'
        });
      }
    });

    return elements;
  };

  console.log(terms,"hello");

  useEffect(() => {
    if (terms && terms.length > 0) {
      const synthesizedElements = synthesizeFoster1(terms);
      setNetworkElements(synthesizedElements);
      console.log(synthesizedElements );
    }
  }, [terms]);

  return (
    <div>
    <div className="w-full max-w-2xl border rounded-lg p-6 shadow-sm">
      <h3 className="text-2xl font-semibold mb-6">Foster1 RC Network Synthesis</h3>
      
      <svg width="800" height="300">
        {networkElements.map((element, index) => {
          const xPosition = 80 + index * 160;
  
          return (
            <g key={index}>
              {/* Series Resistor */}
              {element.type === 'resistor' && (
                <>
                  <Resistor x={xPosition} y="100" />
                  <line x1={xPosition - 60} y1="120" x2={xPosition} y2="120" stroke="black" strokeWidth="2" />
                  <line x1={xPosition + 50} y1="120" x2={xPosition + 100} y2="120" stroke="black" strokeWidth="2" />
                  <text x={xPosition + 10} y="140" fontSize="12" fill="black">
                    R={element.value.toFixed(2)}
                  </text>
                </>
              )}
  
              {/* Series Capacitor */}
              {element.type === 'capacitor' && (
                <>
                  <Capacitor x={xPosition} y="100" />
                  <line x1={xPosition - 60} y1="120" x2={xPosition} y2="120" stroke="black" strokeWidth="2" />
                  <line x1={xPosition + 10} y1="120" x2={xPosition + 100} y2="120" stroke="black" strokeWidth="2" />
                  <text x={xPosition + 10} y="90" fontSize="12" fill="black">
                    C={element.value.toFixed(2)}
                  </text>
                </>
              )}
  
              {/* Parallel Resonant LC Pair */}
              {element.type === 'resonant_pair' && (
                <>
                  {/* Resistor in parallel */}
                  <Resistor x={xPosition} y="70" />
                  <line x1={xPosition - 50} y1="80" x2={xPosition} y2="80" stroke="black" strokeWidth="2" />
                  <line x1={xPosition + 50} y1="80" x2={xPosition + 100} y2="80" stroke="black" strokeWidth="2" />
                  <text x={xPosition + 20} y="60" fontSize="12" fill="black">
                    R={element.R.toFixed(2)}
                  </text>
  
                  {/* Capacitor in parallel, below the resistor */}
                  <NewCapacitor x={xPosition} y="140" />
                  <line x1={xPosition - 50} y1="160" x2={xPosition} y2="160" stroke="black" strokeWidth="2" />
                  <line x1={xPosition + 10} y1="160" x2={xPosition + 100} y2="160" stroke="black" strokeWidth="2" />
                  <text x={xPosition + 20} y="180" fontSize="12" fill="black">
                    C={element.C.toFixed(2)}
                  </text>
  
                  {/* Connecting lines between parallel components */}
                  <line x1={xPosition - 50} y1="80" x2={xPosition - 50} y2="160" stroke="black" strokeWidth="2" />
                  <line x1={xPosition + 100} y1="80" x2={xPosition + 100} y2="160" stroke="black" strokeWidth="2" />
                  <line x1={xPosition + 100} y1="120" x2={xPosition + 110} y2="120" stroke="black" strokeWidth="2" />
                </>
              )}
            </g>
          );
        })}
      </svg>
    </div>
    </div>
  );
  
};

export default Foster1RCSynthesis;
