import React, { useState, useEffect, useContext } from 'react';
// import {Inductor} from '../elements/Inductor';
// import { Capacitor } from '../elements/Capacitor';
// import { Resistor } from '../elements/Resitor';
import { NewCapacitor } from './elements/NewCapacitor';
import { Resistor } from './elements/Resitor';
import { NewInductor } from './elements/NewInductor';
import { Capacitor } from './elements/Capacitor';
import { NewResistor } from './elements/NewResistor';
import PolynomialContext from '../context/PolynomialContext';
const Foster2RLSynthesis = ({ terms }) => {
  const [networkElements, setNetworkElements] = useState([]);
  const {finalResult,setFinalResult} = useContext(PolynomialContext);
  

  const synthesizeFoster1 = (terms) => {
    const elements = [];
    
    terms.forEach((term) => {
      if (term.type === 'polynomial' && term.power === 0) {
        elements.push({ type: 'resistor', value: term.coefficient, position: 'parallel' });
      } else if (term.type === 'simple_pole' && term.root === 0) {
        elements.push({ type: 'inductor', value: 1 / term.coefficient, position: 'parallel' });
      } else if (term.type === 'simple_pole') {
        elements.push({
          type: 'resonant_pair',
          R:-( term.root/term.coefficient) ,
          L: 1 / term.coefficient,
          position: 'series'
        });
      }
    });
    console.log(elements , "in RL of F@")

    return elements;
  };

  console.log(terms,"hello");

  useEffect(() => {
    if (terms && terms.length > 0) {
      const synthesizedElements = synthesizeFoster1(terms);
      setNetworkElements(synthesizedElements);
      setFinalResult(synthesizedElements);
      console.log(synthesizedElements );
    }
  }, [terms]);

  return (
    <div>
    <div className="w-full max-w-2xl border rounded-lg p-6 shadow-sm">
      <h3 className="text-2xl font-semibold mb-6">Foster2 RL Network Synthesis</h3>
      
      <svg width="800" height="300">
        {networkElements.map((element, index) => {
          const xPosition = 80 + index * 160;
  
          return (
            <g key={index}>
              {/* Paralle Capacitor */}
              {element.type === 'inductor' && (
              <>
              <line x1={xPosition } y1="120" x2={xPosition} y2="160" stroke="black" strokeWidth="2" />
              
              <NewInductor x={xPosition-10} y="160" h={100}/>
              {/* Connect line from left side */}
              <line x1={xPosition - 60} y1="120" x2={xPosition} y2="120" stroke="black" strokeWidth="2" />
              {/* Connect line to next element */}
              <line x1={xPosition } y1="250" x2={xPosition} y2="300" stroke="black" strokeWidth="2" />
              <text x={xPosition+10} y="190" fontSize="12" fill="black">L={element.value.toFixed(2)} H</text>
            </>
            )}
  
             {element.type === 'resistor' && (
             <>
            
                {/* Vertical line from the main line to the resonant pair */}
                <line x1={xPosition+100} y1="120" x2={xPosition+100} y2="180" stroke="black" strokeWidth="2" />

                {/* Inductor part of resonant pair, placed lower */}
                <NewResistor x={xPosition+100} y="180" />
                
                {/* Connecting line between inductor and capacitor in series */}
                <line x1={xPosition +100} y1="250" x2={xPosition+100} y2="300" stroke="black" strokeWidth="2" />
                <text x={xPosition+10} y="200" fontSize="12" fill="black">R={element.value.toFixed(2)} ohms </text>
           </>
            )}  
  
              {/* Parallel Resonant LC Pair */}
              {element.type === 'resonant_pair' && (
                <>
                {/* Vertical line from the main line to the resonant pair */}
                <line x1={xPosition+20} y1="120" x2={xPosition+20} y2="150" stroke="black" strokeWidth="2" />

                {/* Inductor part of resonant pair, placed lower */}
                <NewResistor x={xPosition+20} y="150"  />
                <text x={xPosition+30} y="170" fontSize="12" fill="black">R={element.R.toFixed(2)} ohms</text>
                {/* Connecting line between inductor and capacitor in series */}
                <line x1={xPosition + 18} y1="500" x2={xPosition + 18} y2="540" stroke="black" strokeWidth="2" />
                
                {/* Capacitor part of resonant pair */}
                <NewInductor x={xPosition+10} y="220" h={50}/>
                <text x={xPosition+30} y="230" fontSize="12" fill="black">L={element.L.toFixed(2)} H</text>
                <line x1={xPosition+20} y1="260" x2={xPosition+20} y2="350" stroke="black" strokeWidth="2" />
                {/* Horizontal lines for parallel connection */}
                <line x1={xPosition - 60} y1="120" x2={xPosition +100} y2="120" stroke="black" strokeWidth="2" />
                <line x1={xPosition + 50} y1="120" x2={xPosition + 150} y2="120" stroke="black" strokeWidth="2" />
                <line x1={xPosition - 60} y1="300" x2={xPosition +100} y2="300" stroke="black" strokeWidth="2" />
                <line x1={xPosition + 50} y1="300" x2={xPosition + 160} y2="300" stroke="black" strokeWidth="2" />
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

export default Foster2RLSynthesis;
