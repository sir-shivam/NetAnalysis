export function limitAsSTendsToZero(numCoeffs, denCoeffs) {
    // Ensure both arrays are not empty
    if (numCoeffs.length === 0 || denCoeffs.length === 0) {
      throw new Error("Numerator or denominator coefficients array is empty");
    }
  
    // Get the constant (lowest-degree) terms
    const numConstantTerm = numCoeffs[numCoeffs.length - 1];
    const denConstantTerm = denCoeffs[denCoeffs.length - 1];
  
    // If the denominator's constant term is 0, the limit does not exist
    // if (denConstantTerm === 0) {
    //   throw new Error("Denominator constant term is zero, limit as s -> 0 does not exist");
    // }
   let value =  numConstantTerm / denConstantTerm
    if(!(isNaN(value))){
      return value;
    }
    else{
      return 0;
    }
    // Calculate the limit as s -> 0
  }
  
  
  
export function limitAsSTendsToInfinity(numCoeffs, denCoeffs) {
    // Ensure both arrays are not empty
    if (numCoeffs.length === 0 || denCoeffs.length === 0) {
      throw new Error("Numerator or denominator coefficients array is empty");
    }
  
    // Get the highest degree terms (leading coefficients)
    const numLeadingTerm = numCoeffs[0];
    const denLeadingTerm = denCoeffs[0];
  
    // Compare the degrees of the numerator and denominator
    const numDegree = numCoeffs.length - 1;
    const denDegree = denCoeffs.length - 1;
  
    // Determine the limit based on the degrees
    if (numDegree > denDegree) {
      // If the numerator's degree is higher, the limit tends to infinity
      return Infinity;
    } else if (numDegree < denDegree) {
      // If the numerator's degree is lower, the limit tends to zero
      return 0;
    } else {
      // If the degrees are the same, return the ratio of the leading coefficients
      return numLeadingTerm / denLeadingTerm;
    }
  }
  
  // Example usage:

  


