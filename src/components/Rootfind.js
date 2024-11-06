
class Complex {
    constructor(real, imag) {
      this.real = real;
      this.imag = imag;
    }
  
    static add(a, b) {
      return new Complex(a.real + b.real, a.imag + b.imag);
    }
  
    static subtract(a, b) {
      return new Complex(a.real - b.real, a.imag - b.imag);
    }
  
    static multiply(a, b) {
      return new Complex(
        a.real * b.real - a.imag * b.imag,
        a.real * b.imag + a.imag * b.real
      );
    }
  
    static divide(a, b) {
      const denominator = b.real * b.real + b.imag * b.imag;
      return new Complex(
        (a.real * b.real + a.imag * b.imag) / denominator,
        (a.imag * b.real - a.real * b.imag) / denominator
      );
    }
  
    abs() {
      return Math.sqrt(this.real * this.real + this.imag * this.imag);
    }
  }

const evaluatePolynomial = (coeffs, z) => {
  let result = new Complex(coeffs[coeffs.length - 1], 0);
  for (let i = coeffs.length - 2; i >= 0; i--) {
    result = Complex.add(
      Complex.multiply(result, z),
      new Complex(coeffs[i], 0)
    );
  }
  return result;
};

const evaluateDerivative = (coeffs, z) => {
  let result = new Complex(coeffs[coeffs.length - 1] * (coeffs.length - 1), 0);
  for (let i = coeffs.length - 2; i >= 1; i--) {
    result = Complex.add(
      Complex.multiply(result, z),
      new Complex(coeffs[i] * i, 0)
    );
  }
  return result;
};



const findRootsAberth = (coeffs) => {
    const n = coeffs.length - 1;
    
    if (n <= 0) return [];
    if (n === 1) return [{root: -coeffs[0] / coeffs[1], multiplicity: 1}];
    
    const initialRoots = Array(n).fill(0).map((_, i) => {
      const angle = (2 * Math.PI * i) / n;
      return new Complex(Math.cos(angle), Math.sin(angle));
    });
    
    const maxIterations = 50;
    const tolerance = 1e-10;
    let currentRoots = [...initialRoots];
    
    for (let iter = 0; iter < maxIterations; iter++) {
      let maxDiff = 0;
      let converged = true;
      
      for (let i = 0; i < n; i++) {
        const fx = evaluatePolynomial(coeffs, currentRoots[i]);
        const dfx = evaluateDerivative(coeffs, currentRoots[i]);
        
        let sum = new Complex(0, 0);
        for (let j = 0; j < n; j++) {
          if (i !== j) {
            const diff = Complex.subtract(currentRoots[i], currentRoots[j]);
            if (diff.abs() > 1e-12) {
              sum = Complex.add(sum, Complex.divide(new Complex(1, 0), diff));
            }
          }
        }
        
        const correction = Complex.divide(fx, Complex.subtract(dfx, Complex.multiply(fx, sum)));
        const newRoot = Complex.subtract(currentRoots[i], correction);
        
        const diff = Complex.subtract(newRoot, currentRoots[i]).abs();
        maxDiff = Math.max(maxDiff, diff);
        if (diff > tolerance) converged = false;
        
        currentRoots[i] = newRoot;
      }
      
      if (converged) break;
    }
    
    // Group similar roots
    const groupedRoots = [];
    const used = new Set();
    
    for (let i = 0; i < currentRoots.length; i++) {
      if (used.has(i)) continue;
      
      let multiplicity = 1;
      used.add(i);
      
      for (let j = i + 1; j < currentRoots.length; j++) {
        if (!used.has(j) && 
            Complex.subtract(currentRoots[i], currentRoots[j]).abs() < 1e-6) {
          multiplicity++;
          used.add(j);
        }
      }
      
      const realPart = Number(currentRoots[i].real.toFixed(8));
      const imagPart = Number(currentRoots[i].imag.toFixed(8));
      
      if (Math.abs(imagPart) < 1e-6) {
        groupedRoots.push({ root: realPart, multiplicity });
      }
    }
    
    return groupedRoots.sort((a, b) => a.root - b.root);
  };

  export default findRootsAberth;
