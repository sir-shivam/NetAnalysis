import React ,{ useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import PolynomialInput from "./PolynomialInput";
import PolynomialContext from "../context/PolynomialContext";


const HomePage = () => {
    const navigate = useNavigate();
    const [numerator, setNumerator] = useState("6+8s^1+2s^2");
    const [denominator, setDenominator] = useState("12+8s^1+1s^2");
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






    const handleCalculate = async () => {
      // setError("");
      setIsAnalyzing(true);
      setResults(null);

      setTimeout(() => {
        setIsAnalyzing(false);
      }, 3000);
  
      try {
        // Parse input polynomials
        const numCoeff = parsePolynomial(numerator);
        const denCoeff = parsePolynomial(denominator);
        console.log(numCoeff , "given num");
        console.log(denCoeff ,"given denom");
        
        if (denCoeff.every((c) => Math.abs(c) < 1e-10)) {
          throw new Error("Denominator cannot be zero");
        }

        //make it global
        setNumCoeffs(numCoeff);

        setDenCoeffs(denCoeff);
        navigate("/result2");
        setFinding({
          circuit: "C1",
          component : "LC"
        });
        
  
      } catch (err) {
        setError(err.message || "Calculation error occurred please tre again");
      } 
    };

  
    return (
      
        <div className="w-full max-w-2xl p-4 space-y-4">
          <div className="text-xl font-bold">Network Analysis Calculator</div>
    
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Parameter Type
              </label>
              <select
                // value={parameterType}
                // onChange={(e) => setParameterType(e.target.value)}
                className="w-full p-2 border rounded"
              >
                <option value="z">Z Parameter</option>
                <option value="y">Y Parameter</option>
              </select>
            </div>
    
            <div>
              <label className="block text-sm font-medium mb-1">
                Numerator (Format: a + bs^1 + cs^2...)
              </label>
              <input
                value={numerator}
                onChange={(e) => setNumerator(e.target.value)}
                placeholder="Example: 2 + 3s^2"
                className="w-full p-2 border rounded"
              />
            </div>
    
            <div>
              <label className="block text-sm font-medium mb-1">
                Denominator (Format: a + bs^1 + cs^2...)
              </label>
              <input
                value={denominator}
                onChange={(e) => setDenominator(e.target.value)}
                placeholder="Example: 1 + 2s^1 + 4s^3"
                className="w-full p-2 border rounded"
              />
            </div>
    
            <button
              onClick={handleCalculate}
              disabled={isAnalyzing}
              className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400"
            >
              {isAnalyzing ? "Calculating..." : "Analyze Circuit"}
            </button>
    
            {error && (
              <div className="p-4 bg-red-100 text-red-700 rounded">{error}</div>
            )}
          </div>
        </div>
      
    );
  };

export default HomePage;

