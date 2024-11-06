import React, { useState, useEffect } from 'react';
import { NewCapacitor } from './elements/NewCapacitor';
import { NewInductor } from './elements/NewInductor';
import { Capacitor } from './elements/Capacitor';
import { Inductor } from './elements/Inductor';
const Foster2SynthesisLC = ({ terms }) => {
  const [networkElements, setNetworkElements] = useState([]);
 
  const synthesizeFoster1 = (terms) => {
    const elements = [];
    console.log(terms , 'in LC 2')
    terms.forEach((term) => {
      if(term.coefficient !==0){
        if (term.type === 'polynomial' && term.power === 1) {
          elements.push({ type: 'capacitor', value: term.coefficient, position: 'parallel' });
        } else if (term.type === 'polynomial' && term.root === 0) {
          elements.push({ type: 'inductor', value: 1 / term.coefficient, position: 'parallel' });
        } else if (term.type === 'simple_pole') {
          elements.push({
            type: 'resonant_pair',
            C:- (term.coefficient / term.root),
            L: 1 / term.coefficient,
            position: 'series'
          });
        }
      }
    });

    return elements;
  };

  useEffect(() => {
    if (terms && terms.length > 0) {
      const synthesizedElements = synthesizeFoster1(terms);
      setNetworkElements(synthesizedElements);
    }
  }, [terms]);

  return (
    <div className="w-full max-w-2xl  rounded-lg p-6 shadow-sm">
    <h3 className="text-2xl font-semibold mb-6">Foster Form 2 Network Synthesis</h3>
    
    <svg width="800" height="300">
      {networkElements.map((element, index) => {
        const xPosition = 80 + index * 160;

        return (
          <g key={index}>
            {/* Parallel Capacitor or Inductor */}
            {element.type === 'capacitor' && (
              <>
               <line x1={xPosition } y1="120" x2={xPosition } y2="160" stroke="black" strokeWidth="2" />
              <NewCapacitor x={xPosition-20} y="150" />
              {/* Connect line from left side */}
              <line x1={xPosition - 60} y1="120" x2={xPosition} y2="120" stroke="black" strokeWidth="2" />
              {/* Connect line to next element */}
              <line x1={xPosition } y1="168" x2={xPosition } y2="300" stroke="black" strokeWidth="2" />
              <text x={xPosition+10} y="190" fontSize="12" fill="black">C={element.value.toFixed(5)}F</text>
              <line x1={xPosition -10} y1="300" x2={xPosition } y2="300" stroke="black" strokeWidth="2" />
            </>
            )}

            {element.type === 'inductor' && (
             <>
            
                {/* Vertical line from the main line to the resonant pair */}
                <line x1={xPosition+110} y1="120" x2={xPosition+110} y2="180" stroke="black" strokeWidth="2" />

                {/* Inductor part of resonant pair, placed lower */}
                <NewInductor x={xPosition+100} y="180" />
                
                {/* Connecting line between inductor and capacitor in series */}
                <line x1={xPosition+110} y1="270" x2={xPosition+110 } y2="300" stroke="black" strokeWidth="2" />
                <text x={xPosition} y="200" fontSize="12" fill="black">L={element.value.toFixed(2)}H</text>
           </>
            )}

            {/* Series Resonant LC Pair */}
            {element.type === 'resonant_pair' && (
                <>
                {/* Vertical line from the main line to the resonant pair */}
                <line x1={xPosition+20} y1="120" x2={xPosition+20} y2="150" stroke="black" strokeWidth="2" />

                {/* Inductor part of resonant pair, placed lower */}
                <NewInductor x={xPosition+8} y="150" />
                <text x={xPosition+20} y="170" fontSize="12" fill="black">L={element.L.toFixed(2)}H</text>
                {/* Connecting line between inductor and capacitor in series */}
                <line x1={xPosition + 18} y1="420" x2={xPosition + 18} y2="540" stroke="black" strokeWidth="2" />
                
                {/* Capacitor part of resonant pair */}
                <NewCapacitor x={xPosition} y="230" />
                <text x={xPosition+20} y="230" fontSize="12" fill="black">C={element.C.toFixed(5)}F</text>
                <line x1={xPosition+20} y1="260" x2={xPosition+20} y2="350" stroke="black" strokeWidth="2" />
                {/* Horizontal lines for parallel connection */}
                <line x1={xPosition - 60} y1="120" x2={xPosition +100} y2="120" stroke="black" strokeWidth="2" />
                <line x1={xPosition + 50} y1="120" x2={xPosition + 150} y2="120" stroke="black" strokeWidth="2" />
                <line x1={xPosition - 60} y1="300" x2={xPosition +100} y2="300" stroke="black" strokeWidth="2" />
                <line x1={xPosition + 50} y1="300" x2={xPosition + 150} y2="300" stroke="black" strokeWidth="2" />
              </>
            )}
          </g>
        );
      })}
    </svg>
  </div>
);
};

export default Foster2SynthesisLC;
