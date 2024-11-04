

const FosterCalculation = (numCoeffs, denCoeffs, foundRoots) => {
    let smethod = false;


    const checkAnyNegativeResidue = (terms) => {
        return terms.some(term => 
          term.type !== 'polynomial' && term.coefficient < 0
        );
      };


    const calculatePartialFractions = (numCoeffs, denCoeffs, currentRoots) => {
        const terms = [];
        
        // Handle polynomial division
        if (numCoeffs.length >= denCoeffs.length) {
          const quotient = numCoeffs[numCoeffs.length - 1] / denCoeffs[denCoeffs.length - 1];
          terms.push({
            type: 'polynomial',
            coefficient: quotient,
            power: numCoeffs.length - denCoeffs.length
          });
        }
    
        // Process each root
        currentRoots.forEach(({ root, multiplicity }) => {
          // Evaluate numerator and denominator at root
          let num = 0;
          let den = 0;
          
          for (let i = 0; i < numCoeffs.length; i++) {
            num += numCoeffs[i] * Math.pow(root, i);
          }
          
          for (let i = 1; i < denCoeffs.length; i++) {
            den += i * denCoeffs[i] * Math.pow(root, i - 1);
          }
          
          const residue = num / den;
          
          
          terms.push({
            type: 'simple_pole',
            coefficient: residue,
            root: root
          });
    
          
        });
        console.log(terms);
        return terms;
      };
    
    

    let foundTerms = calculatePartialFractions(numCoeffs, denCoeffs, foundRoots);

    if (checkAnyNegativeResidue(foundTerms)) {
        console.log("Negative residues found, trying s-division approach...");
        
        // Multiply both numerator and denominator by s (add a root at 0)
        smethod = true;
        const newDenCoeffs = [0, ...denCoeffs];
        const newRoots = [{root : 0 , multiplicity : 1}, ...foundRoots];
        
      //   roots = [0 , ...roots];
        
        // Recalculate with new coefficients
        foundTerms = calculatePartialFractions(numCoeffs, newDenCoeffs, newRoots  );
      }

      console.log(foundTerms , "found terms");
      return foundTerms;

    
}

export default FosterCalculation;