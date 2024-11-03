import React, { useContext, useEffect, useState } from 'react';
import PolynomialContext from '../context/PolynomialContext';
import findRootsAberth from './Rootfind';
import FosterCalculation from './FosterCalculation';
import Foster1RLSynthesis from './Foster1RL';

import Cauer1 from './Cauer1';
import Cauer2 from './Cauer2';
import Foster1RCSynthesis from './Foster1RC';

export default function Results() {

  const [design, setDesign]= useState("");
  const [terms , setTerms]= useState([]);
  const {
        numCoeffs,
        setNumCoeffs,
        denCoeffs,
        setDenCoeffs,
        roots,
        setRoots,
        
        // Results
        foster1Results,
        setFoster1Results,
        foster2Results,
        setFoster2Results,
        cauer1Results,
        setCauer1Results,
        cauer2Results,
        setCauer2Results,
        
        // Method selection
        currentMethod,
        setCurrentMethod,
        
        // Status
        isAnalyzing,
        setIsAnalyzing,
        results ,
        setResults,
        error,
        setError,
        finding,
        setFinding
        
    } = useContext(PolynomialContext);

//    setResults = {
//     roots: [
//       { root: 1.2345, multiplicity: 1 },
//       { root: -0.6789, multiplicity: 2 },
//     ],
//     terms: [
//       { type: 'polynomial', coefficient: 2.3456, power: 1 },
//       { type: 'fraction', coefficient: 1.2345, root: -0.6789 },
//     ],
//   };

    // let terms = [];

    useEffect(() => {
      
    const rootFound = findRootsAberth(denCoeffs);
    setRoots(rootFound);
    console.log(rootFound , "rrots");
    const termsFound = FosterCalculation(numCoeffs , denCoeffs , rootFound );
    setTerms(termsFound);
    console.log(termsFound , "found")
      
    }, [numCoeffs , denCoeffs])
    
    console.log(terms , "h");

  function handleDesgin(selectedDesign){
    setDesign(selectedDesign);
    console.log(selectedDesign , "hello");
    }    
    


    function handleCircuit(design){
        console.log("in circuit");
        if(design==="Foster1LC"){
          return <div>
         
          </div>
        }
        if(design==="Foster2LC"){
            return <div>
             
           </div>
        }
        if(design==="Cauer1 LC"){
            return <div>
             < Cauer1 find1={{circuit: "C1", component : "LC" , component1 : "LC"}}  />
           </div>
        }
        if(design==="Cauer2 LC"){
            return <div>
            < Cauer2 find1={{circuit: "C2",
          component : "LC" , component1 : "LC"}}  />
           </div>
        }
        if(design==="Foster1RC"){
          return <div>
                       <Foster1RCSynthesis terms={terms}/>

         </div>
          // console.log("Foster RL is running")
        }
        if(design==="Cauer1RC"){
            
          return <div>
            < Cauer1 find1={{circuit: "C1",
          component : "R" , component1 : "RC"}}  />
         </div>
          // console.log("Foster RL is running")
        }
        if(design==="Cauer1RL"){
          return <div>
            < Cauer1 find1={{circuit: "C1",
          component : "R" , component1 : "RL"}}  />
         </div>
        

          // console.log("Foster RL is running")
        }
        if(design==="Cauer2RC"){
            
          return <div className='overflow-y-auto'>
            <Cauer2  find1={{circuit: "C2",
          component : "R" , component1 : "RC" }}/>
         </div>
          // console.log("Foster RL is running")
        }
        if(design==="Cauer2RL"){
          return <div>
           < Cauer2 find1={{circuit: "C2",
          component : "R" , component1 : "RL"}}  />
         </div>
          // console.log("Foster RL is running")
        }
        if(design==="Foster2RC"){
          return <div>
           
         </div>
          // console.log("Foster RL is running")
        }
        if(design==="Foster1RL"){
          return <div>
           <Foster1RLSynthesis terms={terms}/>
         </div>
          // console.log("Foster RL is running")
        }
        if(design==="Foster2RL"){
          // <Foster2RCSynthesis terms={terms}/>
          return <div>

         </div>
        }
      }

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-2xl font-semibold">Analysis Results</h2>
      <p className="text-gray-600">Circuit analysis results and synthesis options</p>
      <div className="space-y-4">
        
       
        <div>
          <h3 className="font-medium">Synthesis Options:</h3>
          <div className="flex flex-wrap gap-2">
          { finding.component == "LC" ? 
          (<div>
            <button className="px-4 py-2 border rounded-md border-gray-300 hover:bg-gray-100" onClick={()=>handleDesgin("Foster1LC")}>Foster1LC</button>
            <button className="px-4 py-2 border rounded-md border-gray-300 hover:bg-gray-100" onClick={()=>handleDesgin("Foster2LC")}>Foster2LC</button>
            <button className="px-4 py-2 border rounded-md border-gray-300 hover:bg-gray-100" onClick={()=>handleDesgin("Cauer1 LC")}>Cauer1 LC</button>
            <button className="px-4 py-2 border rounded-md border-gray-300 hover:bg-gray-100" onClick={()=>handleDesgin("Cauer2 LC")}>Cauer2 LC</button>
          </div>)
           :
           (<div> <button className="px-4 py-2 border rounded-md border-gray-300 hover:bg-gray-100" onClick={()=>handleDesgin("Foster1RC")}>Foster1RC</button>
          <button className="px-4 py-2 border rounded-md border-gray-300 hover:bg-gray-100" onClick={()=>handleDesgin("Foster2RL")}>Foster2RL</button>
          <button className="px-4 py-2 border rounded-md border-gray-300 hover:bg-gray-100" onClick={()=>handleDesgin("Cauer1RC")}>Cauer1RC</button>
          <button className="px-4 py-2 border rounded-md border-gray-300 hover:bg-gray-100" onClick={()=>handleDesgin("Cauer1RL")}>Cauer1RL</button>
          <button className="px-4 py-2 border rounded-md border-gray-300 hover:bg-gray-100" onClick={()=>handleDesgin("Cauer2RC")}>Cauer2RC</button>
          <button className="px-4 py-2 border rounded-md border-gray-300 hover:bg-gray-100" onClick={()=>handleDesgin("Cauer2RL")}>Cauer2RL</button>
          <button className="px-4 py-2 border rounded-md border-gray-300 hover:bg-gray-100" onClick={()=>handleDesgin("Foster2RC")}>Foster2RC</button>
          <button className="px-4 py-2 border rounded-md border-gray-300 hover:bg-gray-100" onClick={()=>handleDesgin("Foster1RL")}>Foster1RL</button>
        </div>) }
          
          </div>
        </div>
      </div>
      <div className='overflow-y-auto border border-green-300 h-[68vh]'>
      <h1>Final Component</h1>
      {/* Pass terms as a prop to FosterSynthesis */}
      {design && handleCircuit(design)}
    </div>
    </div>
  );
}
