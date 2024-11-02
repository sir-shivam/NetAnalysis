import React, { useState , useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import PolynomialContext from "../context/PolynomialContext";


export default function Home({ onAnalyze }) {
    const navigate = useNavigate();
    const [numerator, setNumerator] = useState("24+18s^1+3s^2");
    const [denominator, setDenominator] = useState("3s^1+1s^2");
    const [Analyse, setAnalyse] = useState(false);
    const [isCalculating, setIsCalculating] = useState(false);



    const {
        numCoeffs,
        setNumCoeffs,
        denCoeffs,
        setDenCoeffs,
        
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
  
    // const handleAnalyze = () => {
    //   navigate('/analysis');
    // };

    // Function to parse polynomial terms and check even/odd power patterns


// Test the function with input directly
const input1 = "1s^3 + 3s^1";
const input2 = "2s^6+3s^5+1s^4 + 6s^2 + 8";
const input3 = "1s^2 + 3s^1";
const input4 = "1s^2 + 6s^1 + 8";



    const parsePolynomial = (input) => {
      const terms = input.split("+").map((term) => term.trim());
      const coefficients = [];
  
      terms.forEach((term) => {
        const match = term.match(/^([\d.]+)(s\^(\d+))?$/);
        if (match) {
          const coeff = parseFloat(match[1]);
          const power = match[3] ? parseInt(match[3]) : 0;
          while (coefficients.length <= power) {
            coefficients.push(0);
          }
          coefficients[power] = coeff;
        }
      });
  
      return coefficients.length ? coefficients : [0];
    };

    function hasAlternateZeros(arr) {
        // Check if the array contains any zeros
        if (!arr.includes(0)) {
            return false; // No zeros in the array, return false
        }
    
        let lastZeroIndex = -1; // Initialize to -1 to track the last zero index
        let foundFirstZero = false; // Track if we have found the first zero
    
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] === 0) {
                // Check for consecutive zeros
                if (lastZeroIndex === i - 1) {
                    return false; // Found consecutive zeros
                }
                lastZeroIndex = i; // Update last zero index
                foundFirstZero = true; // Mark that we found the first zero
            }
        }
    
        // Check if at least one non-zero exists after the first zero
        if (foundFirstZero) {
            for (let j = lastZeroIndex + 1; j < arr.length; j++) {
                if (arr[j] !== 0) {
                    return true; // Found a non-zero after a zero
                }
            }
            return false; // No non-zero found after the last zero
        }
    
        return false; // Fallback, should not reach here
    }

  function removeAlternateZeros(arr) {
    let result = [];
    // let zeroCount = 0; // Initialize zero count within the function

    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === 0) {
            // Only add the 0 to the result if it is the first occurrence
            if (i === 0) {
                result.push(arr[i]);
            }
        } else {
            // Always add non-zero values
            result.push(arr[i]);
        }
    }

    return result; // Return result
}







    const handleCalculate = async () => {
    let possibleCircuit = "R";
      setError("");
      setIsAnalyzing(true);
      setResults(null);

      setTimeout(() => {
        setIsAnalyzing(false);
      }, 3000);
  
      try {
        // Parse input polynomials
        let  numCoeff = parsePolynomial(numerator);
        if(hasAlternateZeros(numCoeff)){
          console.log("num has alt");
          // alert for LC circuit only 
          console.log("alternating 0 " , numCoeff)
          possibleCircuit = "LC"
          numCoeff = removeAlternateZeros(numCoeff);
        }
        let  denCoeff = parsePolynomial(denominator);
        if(hasAlternateZeros(denCoeff)){
          // alert for LC circuit only 
          possibleCircuit = "LC"
          denCoeff = removeAlternateZeros(denCoeff);
        }
        console.log(numCoeff , "given num");
        console.log(denCoeff ,"given denom");
        
        if (denCoeff.every((c) => Math.abs(c) < 1e-10)) {
          throw new Error("Denominator cannot be zero");
        }

        //make it global
        setNumCoeffs(numCoeff);
        setDenCoeffs(denCoeff);
        
        
        setFinding({
          circuit: "none",
          component : possibleCircuit
        });
        
  
      } catch (err) {
        setError(err.message || "Calculation error occurred please tre again");
      } finally{
        onAnalyze();
      }
    };


  return (
    <div
      className={`${
        Analyse ? 'h-screen ' : 'min-h-screen'
      } flex items-center justify-center bg-gray-100 transition-all duration-500  `}
    >
      <div
        className={`${
          Analyse ? 'w-[80%]' : 'w-full max-w-2xl'
        }  bg-white p-6 shadow-md rounded-lg max-h-[80vh] overflow-y-auto transition-all duration-500`}
      >
        <div className="mb-4">
          <h2 className="text-2xl font-semibold">Network Analysis Calculator</h2>
          <p className="text-gray-600">Enter the transfer function details below</p>
        </div>
        <div className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="numerator" className="block text-sm font-medium text-gray-700">
              Numerator (Format: a + bs^1 + cs^2...)
            </label>
            <input
              type="text"
              id="numerator"
              value={numerator}
              onChange={(e) => setNumerator(e.target.value)}
              placeholder="Example: 2 + 3s^2"
              className={`${
                Analyse ? 'w-full' : 'w-full'
              } px-3 py-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-500`}
              style={{ minHeight: '3rem', resize: 'vertical' }}
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="denominator" className="block text-sm font-medium text-gray-700">
              Denominator (Format: a + bs^1 + cs^2...)
            </label>
            <input
              type="text"
              id="denominator"
              value={denominator}
              onChange={(e) => setDenominator(e.target.value)}
              placeholder="Example: 1 + 2s^1 + 4s^3"
              className={`${
                Analyse ? 'w-full' : 'w-full'
              } px-3 py-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-500`}
              style={{ minHeight: '3rem', resize: 'vertical' }}
            />
          </div>
          <button
            onClick={handleCalculate}
            disabled={isCalculating}
            className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition duration-300"
          >
            {isCalculating ? 'Calculating...' : 'Analyze Circuit'}
          </button>
        </div>
      </div>
    </div>
  );
}
