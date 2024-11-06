const Cauer2 = (numCoeffs, denCoeffs) => {
  let numC2 = [...numCoeffs];
  let denC2 = [...denCoeffs];

  // Remove leading zeros from denominator
  while (denC2.length > 0 && Math.abs(denC2[0]) < 1e-10) {
    console.log("Removing leading zero from denominator");
    denC2.shift();
  }

  // Check if denominator is empty after removing zeros
  if (denC2.length === 0) {
    console.log("Error: All denominator coefficients are zero");
    return [];
  }

  const calculateContinuedFraction1 = (numCoeffs, denCoeffs) => {
    console.log("start");

    const polynomialDivision = (dividend, divisor) => {
      if (dividend.length < divisor.length) {
        return { quotient: [0], remainder: dividend };
      }

      // Check for division by zero
      if (Math.abs(divisor[0]) < 1e-10) {
        console.log("Warning: Division by zero encountered");
        return {
          quotient: [Infinity],
          remainder: dividend
        };
      }

      const quotient = dividend[0] / divisor[0];
      console.log("Current quotient term:", isFinite(quotient) ? quotient : "Infinity");

      // Calculate remainder only if quotient is finite
      const remainder = [];
      if (isFinite(quotient)) {
        for (let i = 0; i < dividend.length; i++) {
          const subtrahend = i < divisor.length ? quotient * divisor[i] : 0;
          const remainderTerm = dividend[i] - subtrahend;
          if (Math.abs(remainderTerm) > 1e-10) {
            remainder.push(remainderTerm);
          }
        }

        // Remove trailing zeros from remainder
        while (
          remainder.length > 0 &&
          Math.abs(remainder[remainder.length - 1]) < 1e-10
        ) {
          remainder.pop();
        }
      }

      return {
        quotient: [quotient],
        remainder: remainder
      };
    };

    const components = [];
    let currentNumerator = [...numCoeffs];
    let currentDenominator = [...denCoeffs];

    while (
      currentNumerator.length > 0 &&
      currentDenominator.length > 0 &&
      components.length < 100 // Safety limit to prevent infinite loops
    ) {
      console.log("\nStep - Current division:");
      console.log("Dividing:", currentNumerator, "by", currentDenominator);

      const { quotient, remainder } = polynomialDivision(
        currentNumerator,
        currentDenominator
      );

      console.log("Quotient:", quotient);
      console.log("Remainder:", remainder);

      // Only add component if quotient is finite
      if (isFinite(quotient[0])) {
        components.push({
          quotient: quotient[0],
          remainder
        });
      } else {
        console.log("Skipping infinite quotient");
        break;
      }

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
      const value = comp.quotient;
      const isSeriesElement = index % 2 === 0;
      console.log(`${isSeriesElement ? "Series" : "Parallel"} element with value:`, value);
      
      return {
        type: isSeriesElement ? "R" : "L",
        value: value,
        arrangement: isSeriesElement ? "series" : "parallel"
      };
    });

    console.log("\nFinal circuit elements:");
    console.log(elements, "cauer 2 result");

    return elements;
  };

  const result = calculateContinuedFraction1(numC2, denC2);
  return result;
};

export default Cauer2;