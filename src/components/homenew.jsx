import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PolynomialContext from "../context/PolynomialContext";
import findRootsAberth from './Rootfind';

export default function Home({ onAnalyze }) {
    const navigate = useNavigate();
    const [numerator, setNumerator] = useState("3s^2+18s^1+24");
    const [denominator, setDenominator] = useState("1s^2+3s^1");
    const [isCalculating, setIsCalculating] = useState(false);

    const {
        numCoeffs, setNumCoeffs,
        denCoeffs, setDenCoeffs,
        finding, setFinding,
        parameterType, setParameterType,
        error, setError
    } = useContext(PolynomialContext);

    let possibleCircuit = "R";

    useEffect(() => {
      
    
      setError("");
      
    }, [numerator , denominator])
    
    // Parsing function
    const parsePolynomial = (input) => {
        const terms = input.split("+").map(term => term.trim());
        const coefficients = [];

        terms.forEach(term => {
            const match = term.match(/^([\d.]+)(s\^(\d+))?$/);
            if (match) {
                const coeff = parseFloat(match[1]);
                const power = match[3] ? parseInt(match[3]) : 0;
                while (coefficients.length <= power) coefficients.push(0);
                coefficients[power] = coeff;
            }
        });

        return coefficients.length ? coefficients : [0];
    };

    // Check if array has zeros at alternate positions (all even or all odd indices)
const hasAlternateZeros = (arr) => {
  if (!arr || arr.length === 0) return false;
  
  // Check if zeros are at even indices
  let evenZeros = true;
  let oddZeros = true;
  
  for (let i = 0; i < arr.length; i++) {
      if (i % 2 === 0 && arr[i] !== 0) {
          evenZeros = false;
      }
      if (i % 2 === 1 && arr[i] !== 0) {
          oddZeros = false;
      }
  }
  
  // Return true if either all even indices or all odd indices are zeros
  return evenZeros || oddZeros;
};

// Remove coefficients at positions that cause alternate zeros
const removeAlternateZeros = (arr) => {
  if (!arr || arr.length === 0) return [];
  
  // Determine if zeros are at even or odd positions
  let removeEven = true;
  for (let i = 0; i < arr.length; i += 2) {
      if (arr[i] !== 0) {
          removeEven = false;
          break;
      }
  }
  
  // Create new array removing appropriate indices
  return arr.filter((_, index) => 
      removeEven ? index % 2 === 1 : index % 2 === 0
  );
};

// Process both numerator and denominator polynomials
const processPolynomials = (numCoeff, denCoeff) => {
  possibleCircuit = null;
  
  // Check and process numerator
  if (hasAlternateZeros(numCoeff)) {
      possibleCircuit = "LC";
      numCoeff = removeAlternateZeros(numCoeff);
  }
  
  // Check and process denominator
  if (hasAlternateZeros(denCoeff)) {
      if (possibleCircuit === "LC") {
          denCoeff = removeAlternateZeros(denCoeff);
          while (denCoeff.length < 3) {
            denCoeff.unshift(0);
          }
      } else {
          throw new Error("Error - circuit not feasible");
      }
  }
  
  return { numCoeff, denCoeff };
};


    const handleCalculate = async () => {
        setIsCalculating(true);

        try {
            possibleCircuit = "R";

            // Parse polynomials
            let numCoeff = parsePolynomial(numerator);
            
            let denCoeff = parsePolynomial(denominator);
            const result = processPolynomials(numCoeff, denCoeff);
            if(result){
              numCoeff = result.numCoeff;
              denCoeff = result.denCoeff;
            }
            console.log(result);

            // Validate denominator
            if (denCoeff.every(c => Math.abs(c) < 1e-10)) {
                throw new Error("Denominator cannot be zero");
            }

            // Calculate roots
            const numRoots = findRootsAberth(numCoeff);
            const denRoots = findRootsAberth(denCoeff);

            // Check for non-positive roots only
            const allRoots = [...numRoots, ...denRoots];
            if (allRoots.some(root => root.root > 0)) {
                throw new Error("All roots must be non-positive (negative or zero only)");
            }

            // Sort and alternate roots
            const combinedRoots = [
                ...numRoots.map(root => ({ ...root, type: "zero" })),
                ...denRoots.map(root => ({ ...root, type: "pole" }))
            ].sort((a, b) => a.root - b.root);

            const isAlternatingRoots = combinedRoots.every((item, index) => {
                if (index === 0) return true;
                return combinedRoots[index - 1].type !== item.type;
            });
            if (!isAlternatingRoots) throw new Error("Circuit not feasible as poles and zeros do not alternate");

            // Nearest root to origin
            const nearestRoot = combinedRoots.reduce((closest, current) => {
                return Math.abs(current.root) < Math.abs(closest.root) ? current : closest;
            });

            // Set findings and coefficients
            setNumCoeffs(numCoeff);
            setDenCoeffs(denCoeff);
            setFinding({ nearest: nearestRoot.type, component: possibleCircuit });
            onAnalyze();


        } catch (err) {
            setError(err.message || "Calculation error occurred. Please try again.");
        } finally {
            setIsCalculating(false);
        }
    };

    return (
        <div className="flex-col justify-center items-center bg-blue-500 min-h-screen">
             <h1 className="text-4xl text-center pt-5 text-white font-semibold">Network Analysis Circuit Analyzer</h1>
        <div className='flex justify-center items-center pt-16'>
        <div className="bg-white p-10 shadow-md rounded-lg w-full max-w-2xl">
               
               <p className="text-gray-600 mb-4">Enter the transfer function details below</p>

               <label className="block text-sm font-medium mb-2">Parameter Type</label>
               <select
                   value={parameterType}
                   onChange={(e) => setParameterType(e.target.value)}
                   className="w-full p-2 border rounded mb-4"
               >
                   <option value="z">Z Parameter</option>
                   <option value="y">Y Parameter</option>
               </select>

               <label className="block text-sm font-medium text-gray-700 mb-2">Numerator</label>
               <input
                   type="text"
                   value={numerator}
                   onChange={(e) => setNumerator(e.target.value)}
                   placeholder="Example: 3s^2+18s+24"
                   className="w-full p-4 border rounded mb-4"
               />

               <label className="block text-sm font-medium text-gray-700 mb-2">Denominator</label>
               <input
                   type="text"
                   value={denominator}
                   onChange={(e) => setDenominator(e.target.value)}
                   placeholder="Example: 1s^2+3s+4"
                   className="w-full p-4 border rounded mb-4"
               />

               <button
                   onClick={handleCalculate}
                   disabled={isCalculating}
                   className={`w-full p-4 text-white ${isCalculating ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'} rounded transition duration-300`}
               >
                   {isCalculating ? 'Calculating...' : 'Analyze Circuit'}
               </button>

               {error && <p className="text-red-600 mt-4">{error}</p>}
           </div>
        </div>
        </div>
    );
}
