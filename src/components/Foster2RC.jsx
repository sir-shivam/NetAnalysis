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
const Foster2RCSynthesis = ({ terms }) => {
  const [networkElements, setNetworkElements] = useState([]);

const {finalResult,setFinalResult , numCoeffs,denCoeffs,parameterType, } = useContext(PolynomialContext);
  

  const synthesizeFoster1 = (terms) => {
    const elements = [];
    console.log(terms , "foserr 2 RC")
    
    terms.forEach((term) => {
     if(term.coefficient!==0 && term.coefficient!==NaN){
      if (term.type === 'polynomial' && term.power === 0) {
        elements.push({ type: 'resistor', value: term.coefficient, position: 'parallel' });
      } else if (term.type === 'polynomial' && term.power === 1 && term.coefficient!==0) {
        elements.push({ type: 'capacitor', value: 1 / term.coefficient, position: 'parallel' });
      } else if (term.type === 'simple_pole') {
        elements.push({
          type: 'resonant_pair',
          R:( 1/term.coefficient) ,
          C: -(term.coefficient / term.root),
          position: 'series'
        });
      }
     }
    });

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
  }, [terms , numCoeffs , denCoeffs , parameterType]);

  return (
    <div>
    <div className="w-full max-w-2xl  rounded-lg p-6 shadow-sm">
      <h3 className="text-2xl font-semibold mb-6">Foster2 RC Network Synthesis</h3>
      
      <svg width="800" height="300">
        {networkElements.map((element, index) => {
          const xPosition = 80 + index * 160;
  
          return (
            <g key={index}>
             
              {(element.type === 'capacitor' && element.value!==0)&& (
              <>
              
              <NewCapacitor x={xPosition-30} y="200" />
              <text x={xPosition+5} y="210" fontSize="12" fill="black">C={element.value.toFixed(2)} F</text>
                <line x1={xPosition-10} y1="220" x2={xPosition-10} y2="350" stroke="black" strokeWidth="2" />
                <line x1={xPosition-10} y1="120" x2={xPosition-10} y2="210" stroke="black" strokeWidth="2" />
              
             
            </>
            )}
  
             {(element.type === 'resistor' && element.value!==0) && (
             <>
            
                
                <line x1={xPosition+100} y1="120" x2={xPosition+100} y2="180" stroke="black" strokeWidth="2" />
                <line x1={xPosition+50} y1="120" x2={xPosition+100} y2="120" stroke="black" strokeWidth="2" />
                {/* Inductor part of resonant pair, placed lower */}
                <NewResistor x={xPosition+100} y="180" />
                
               
                <line x1={xPosition +100} y1="250" x2={xPosition+100} y2="300" stroke="black" strokeWidth="2" />
                <line x1={xPosition+50} y1="300" x2={xPosition+100} y2="300" stroke="black" strokeWidth="2" />
                <text x={xPosition+10} y="200" fontSize="12" fill="black">R={element.value.toFixed(2)} ohms</text>
           </>
            )}  
  
            
              {(element.type === 'resonant_pair'&& element.value!==0) && (
                <>
            
                <line x1={xPosition+20} y1="120" x2={xPosition+20} y2="150" stroke="black" strokeWidth="2" />

               
                <NewResistor x={xPosition+20} y="150"  />
                <text x={xPosition+35} y="170" fontSize="12" fill="black">R={element.R.toFixed(2)} ohms</text>
                
                <line x1={xPosition + 18} y1="420" x2={xPosition + 18} y2="540" stroke="black" strokeWidth="2" />
                <line x1={xPosition + 20} y1="220" x2={xPosition + 20} y2="250" stroke="black" strokeWidth="2" />
                
                <NewCapacitor x={xPosition} y="240" />
                <text x={xPosition+35} y="260" fontSize="12" fill="black">C={element.C.toFixed(2)} F</text>
                <line x1={xPosition+20} y1="260" x2={xPosition+20} y2="350" stroke="black" strokeWidth="2" />
                
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
    </div>
  );
  
};

export default Foster2RCSynthesis;
