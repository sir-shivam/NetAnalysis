// src/context/PolynomialState.js
import React, { useState } from "react";
import PolynomialContext from "./PolynomialContext";

function PolynomialState({ children }) {
  // Main polynomial coefficients
  const [numCoeffs, setNumCoeffs] = useState([]);
  const [denCoeffs, setDenCoeffs] = useState([]);

  // Results for different methods
  const [foster1Results, setFoster1Results] = useState(null);
  const [foster2Results, setFoster2Results] = useState(null);
  const [cauer1Results, setCauer1Results] = useState(null);
  const [cauer2Results, setCauer2Results] = useState(null);

  // Current analysis method being viewed
  const [currentMethod, setCurrentMethod] = useState(null);

  // Analysis status
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results , setResults] = useState([]);
  const [error, setError] = useState(null);
  const [finding, setFinding] = useState({});
  const [roots, setRoots] = useState([]);
  const [finalResult,setFinalResult] = useState([]);
  const [parameterType, setParameterType] = useState("z");
<<<<<<< Updated upstream
  const [numRoot , setNumRoot] = useState([]);
  const [denRoot, setDenRoot] = useState([]);


=======
  const [numRoot,setNumRoot]= useState([]);
  const [denRoot, setDenRoot]= useState([]);
>>>>>>> Stashed changes
    const processCoefficients = () => {
    // const numCoeffs = parseCoefficients(numeratorCoeffs);
    // const denCoeffs = parseCoefficients(denominatorCoeffs);

    // if (!numCoeffs || !denCoeffs) {
    //   return false;
    // }

    // return {
    //   numerator: numCoeffs,
    //   denominator: denCoeffs
    // };
  };
  

  return (
    <PolynomialContext.Provider
      value={{
        // Coefficients
        numCoeffs,
        setNumCoeffs,
        denCoeffs,
        setDenCoeffs,
        roots,
        setRoots,
        numRoot,setNumRoot,denRoot,setDenRoot,
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
        setFinding,
        finalResult,
        setFinalResult,
        parameterType,
        setParameterType,
        numRoot , setNumRoot,
        denRoot, setDenRoot,
        
        // Helper functions
        // processCoefficients
      }}
    >
      {children}
    </PolynomialContext.Provider>
  );
}

export default PolynomialState;



// Helper function to parse coefficients string into array
//   const parseCoefficients = (coeffString) => {
//     try {
//       return coeffString.split(',').map(num => parseFloat(num.trim()));
//     } catch (err) {
//       setError("Invalid coefficient format. Please use comma-separated numbers.");
//       return null;
//     }
//   };

//   // Function to validate and process coefficients
