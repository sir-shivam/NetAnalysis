// Function to evaluate limit of rational function as s approaches a value (0 or infinity)
export function evaluateRationalLimit(numeratorCoeffs, denominatorCoeffs,approach) {
    if (numeratorCoeffs.length === 0) numeratorCoeffs = [0];
    if (denominatorCoeffs.length === 0) denominatorCoeffs = [1];
    
    if (approach === 'zero') {
        // For s → 0, divide constant terms
        const numConstant = numeratorCoeffs[0] || 0;
        const denConstant = denominatorCoeffs[0] || 0;
        
        if (denConstant === 0) {
            // Check next lowest terms for 0/0 case
            let numOrder = getLowestOrder(numeratorCoeffs);
            let denOrder = getLowestOrder(denominatorCoeffs);
            
            if (numOrder === Infinity && denOrder === Infinity) return 0;
            
            if (numOrder === denOrder) {
                return numeratorCoeffs[numOrder] / denominatorCoeffs[denOrder];
            }
            
            if (denOrder < numOrder) return 0;
            return numOrder < denOrder ? Infinity : 0;
        }
        
        return numConstant / denConstant;
        
    } else if (approach === 'infinity') {
        // For s → ∞, compare highest degree terms
        const numDegree = numeratorCoeffs.length - 1;
        const denDegree = denominatorCoeffs.length - 1;
        const numLeading = numeratorCoeffs[numDegree];
        const denLeading = denominatorCoeffs[denDegree];
        
        if (numDegree < denDegree) return 0;
        if (numDegree > denDegree) {
            return numLeading > 0 ? Infinity : -Infinity;
        }
        return numLeading / denLeading;
    }
}

// Helper function to get lowest non-zero term order
function getLowestOrder(coeffs) {
    for (let i = 0; i < coeffs.length; i++) {
        if (coeffs[i] !== 0) return i;
    }
    return Infinity;
}

// Function to parse rational expression into numerator and denominator coefficients
function parseRationalExpression(expression) {
    // Split into numerator and denominator
    let [numerator, denominator = "1"] = expression.split('/').map(part => part.trim());
    
    // Parse both parts
    return {
        numerator: parsePolynomial(numerator),
        denominator: parsePolynomial(denominator)
    };
}

// Function to parse polynomial string to coefficients array
function parsePolynomial(expression) {
    // Remove spaces and parentheses
    expression = expression.replace(/\s+|\(|\)/g, '').toLowerCase();
    
    // Split terms considering both + and - signs
    let terms = expression.split(/(?=[-+])/);
    
    // Initialize coefficients array
    let coefficients = [];
    
    // Parse each term
    terms.forEach(term => {
        // Match coefficient and power
        let match = term.match(/^([+-]?\d*)?s?(\^?\d*)?$/);
        if (match) {
            let coefficient = match[1] || '1';
            if (coefficient === '+') coefficient = '1';
            if (coefficient === '-') coefficient = '-1';
            let power = match[2] ? parseInt(match[2].replace('^', '')) : (term.includes('s') ? 1 : 0);
            
            // Ensure array is large enough
            while (coefficients.length <= power) {
                coefficients.push(0);
            }
            
            // Add coefficient
            coefficients[power] = parseInt(coefficient);
        }
    });
    
    return coefficients;
}

// Main function to calculate limit of rational function
function calculateRationalLimit(expression, approach = 'zero') {
    const { numerator, denominator } = parseRationalExpression(expression);
    return evaluateRationalLimit(numerator, denominator, approach);
}