

const Cauer1 = (numCoeffs , denCoeffs ) => {
  

  

  let numC1 = [...numCoeffs].reverse();
  let denC1 = [...denCoeffs].reverse();


  //cauer 1 function takes input in decreasing order of s and provide cauer 1

  const calculateContinuedFraction1 = (reversedNum, reversedDen) => {

    if (reversedDen[0] === 0) reversedDen.shift();
    if (reversedNum[0] === 0) reversedNum.shift();

    console.log("Step 1 - Reversed coefficients:");
    console.log(numCoeffs, "currnet num");
    console.log("Numerator:", reversedNum); // represents 2x² + 8x + 6
    console.log(denCoeffs, "currnet den");
    console.log("Denominator:", reversedDen); // represents x² + 8x + 12

    // Helper function to perform polynomial long division with reversed coefficients
    const polynomialDivision = (dividend, divisor) => {
      if (dividend.length < divisor.length)
        return { quotient: [0], remainder: dividend };

      // For reversed coefficients, we start division from the constant term (index 0)
      const quotient = dividend[0] / divisor[0];
      console.log("Current quotient term:", quotient);
      

      // Calculate remainder by subtracting (quotient * divisor) from dividend
      const remainder = [];
      for (let i = 0; i < dividend.length; i++) {
        const subtrahend = i < divisor.length ? quotient * divisor[i] : 0;
        const remainderTerm = dividend[i] - subtrahend;
        if (Math.abs(remainderTerm) > 1e-10) {
          // Only keep significant terms
          remainder.push(remainderTerm);
        }
      }

      // Remove any trailing zeros from remainder
      while (
        remainder.length > 0 &&
        Math.abs(remainder[remainder.length - 1]) < 1e-10
      ) {
        remainder.pop();
      }

      return {
        quotient: [quotient],
        remainder: remainder,
      };
    };

    const components = [];
    let currentNumerator = reversedNum;
    let currentDenominator = reversedDen;

    while (currentNumerator.length > 0 && currentDenominator.length > 0) {
      console.log("\nStep - Current division:");
      console.log("Dividing:", currentNumerator, "by", currentDenominator);

      const { quotient, remainder } = polynomialDivision(
        currentNumerator,
        currentDenominator
      );

      console.log("Quotient:", quotient);
      console.log("Remainder:", remainder);

      components.push({
        quotient: quotient[0],
        remainder,
      });

      // Break if remainder is zero or negligible
      if (
        remainder.length === 0 ||
        remainder.every((coeff) => Math.abs(coeff) < 1e-10)
      ) {
        break;
      }
      // For next iteration, divide the previous divisor by the remainder
      currentNumerator = currentDenominator;
      currentDenominator = remainder;
    }

    // Convert components to circuit elements
    const elements = components.map((comp, index) => {
      let value = comp.quotient;

      const isSeriesElement = index % 2 === 0;
      console.log(isSeriesElement, "parallel , series");

        return {
          type: isSeriesElement ? "R" : "L",
          value: value,
          arrangement: isSeriesElement ? "series" : "parallel",
        };
      
    });

    console.log("\nFinal circuit elements:");
    console.log(elements, "cauer 1 result");
    
    return elements;
  };

  const result = calculateContinuedFraction1(numC1, denC1);

  return result ;
};

export default Cauer1;

