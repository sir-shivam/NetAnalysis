import React, { useContext, useEffect, useRef, useState } from "react";

import PolynomialInput from "./PolynomialInput";
import PolynomialContext from "../context/PolynomialContext";

const Cauer2 = ({find1}) => {
  const [numerator, setNumerator] = useState("");
  const [denominator, setDenominator] = useState("");
  const canvasRef  = useRef(null);
  const canvasRef1  = useRef(null);
  // let modifiedResults = [];
  const [cauerRL , setCauerRl] = useState([]);

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
    results,
    setResults,
    error,
    setError,
   
  } = useContext(PolynomialContext);

  let numC2 = numCoeffs;
  let denC2 = denCoeffs;
  if (denC2[0] === 0) {
    denC2.shift();
  }


  useEffect(() => {
    console.log(numC2, " num in coeer1");
    console.log(denC2, "denominator in couer1");
    if (find1.circuit == "C2") {
      const result = calculateContinuedFraction1(numC2, denC2);
      // canvasCal();
    }
  }, []);
  

 



  class CircuitComponent {
    constructor(type, value, x, y, width = 40, height = 20) {
      this.type = type;
      this.value = value;
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
    }
  
    getColor() {
      const colors = {
        'R': 'green',
        'L': 'red',
        'C': 'blue'
      };
      return colors[this.type] || 'black';
    }
  }
  
  class CircuitDrawer {
    constructor(canvasRef) {
      this.canvas = canvasRef.current;
      this.ctx = this.canvas.getContext('2d');
      this.components = [];
      this.startX = 50;
      this.startY = 50;
      this.endY = 200;
      this.spacing = 100;
    }
  
    initialize() {
      // Clear canvas
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.ctx.font = '12px Arial';
      this.ctx.textAlign = 'center';
      this.ctx.lineWidth = 2;
      
      // Draw terminals A and B
      this.drawTerminals();
    }
  
    drawTerminals() {
      // Draw A terminal
      this.ctx.fillText('A', this.startX - 20, this.startY);
      this.ctx.beginPath();
      this.ctx.moveTo(this.startX - 30, this.startY);
      this.ctx.lineTo(this.startX - 10, this.startY);
      this.ctx.stroke();
  
      // Draw B terminal
      this.ctx.fillText('B', this.startX - 20, this.endY);
      this.ctx.beginPath();
      this.ctx.moveTo(this.startX - 30, this.endY);
      this.ctx.lineTo(this.startX - 10, this.endY);
      this.ctx.stroke();
    }
  
    addComponent(component) {
      this.components.push(component);
    }
  
    drawComponent(component) {
      this.ctx.fillStyle = component.getColor();
      
      // Draw component box
      this.ctx.fillRect(
        component.x,
        component.y - component.height / 2,
        component.width,
        component.height
      );
  
      // Draw component label
      this.ctx.fillStyle = 'black';
      this.ctx.fillText(
        `${component.type}: ${component.value.toFixed(2)}`,
        component.x + component.width / 2,
        component.y - component.height
      );
    }
  
    drawWire(fromX, fromY, toX, toY) {
      this.ctx.beginPath();
      this.ctx.moveTo(fromX, fromY);
      this.ctx.lineTo(toX, toY);
      this.ctx.stroke();
    }
  
    drawCircuit(elements) {
      this.initialize();
      let currentX = this.startX;
      let previousSeriesY = this.startY;
  
      elements.forEach((element, index) => {
        const { type, value, arrangement } = element;
        const isParallel = arrangement === 'parallel';
        
        if (isParallel) {
          // Create parallel component
          const component = new CircuitComponent(
            type,
            value,
            currentX,
            this.endY
          );
          
          // Draw vertical connection wire
          this.drawWire(currentX, this.startY, currentX, this.endY);
          
          // Draw component
          this.drawComponent(component);
          
          // Draw horizontal wires
          if (index > 0) {
            this.drawWire(currentX - this.spacing, this.startY, currentX, this.startY);
          }
          
        } else {
          // Create series component
          const component = new CircuitComponent(
            type,
            value,
            currentX,
            previousSeriesY
          );
          
          // Draw horizontal connecting wire
          if (index > 0) {
            this.drawWire(currentX - this.spacing, previousSeriesY, currentX, previousSeriesY);
          }
          
          // Draw component
          this.drawComponent(component);
          currentX += this.spacing;
        }
      });
  
      // Draw final connection to B terminal if needed
      if (currentX > this.startX) {
        this.drawWire(currentX - this.spacing, this.endY, currentX - this.spacing / 2, this.endY);
      }
    }
  }
  
  // Usage example:
  const drawCircuit = (elements , componenet) => {
    let circuitDrawer ;
    if(componenet == "RL"  || componenet == "LC"){
       circuitDrawer = new CircuitDrawer(canvasRef);
    }
    else if(componenet == "RC"){
      circuitDrawer = new CircuitDrawer(canvasRef1);

    }
    circuitDrawer.drawCircuit(elements);
  };

  //cauer 1 function takes input in decreasing order of s and provide cauer 1

  const calculateContinuedFraction1 = (reversedNum, reversedDen) => {
    console.log("start");

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
      if (!isSeriesElement && find1.component == "R") {
        value = 1 / comp.quotient;
      }
      else if(isSeriesElement && find1.component == "LC"){
        value = 1 / comp.quotient;
      }
      else if(!isSeriesElement && find1.component == "LC"){
        value = 1 / comp.quotient;
      }


      if(find1.component == "R"){
        return {
          type: isSeriesElement ? "R" : "L",
          value: value,
          arrangement: isSeriesElement ? "series" : "parallel",
        };
      }else if(find1.component == "LC"){
        return {
          type: isSeriesElement ? "C" : "L",
          value: value,
          arrangement: isSeriesElement ? "series" : "parallel",
        };
      }
      
    });

    console.log("\nFinal circuit elements:");
    setCauer1Results(elements);
    console.log(elements, "cauer 1 result");
    // canvasCal(elements)

    if(find1.component == "R"){

    drawCircuit(elements , "RL"); // RL
    
      const modifiedResults = elements.map((component) => ({
        ...component,
        arrangement: component.arrangement === 'series' ? 'parallel' : 'series'
      }));

      setCauerRl(modifiedResults);

      drawCircuit( modifiedResults, "RC"); // RC
    }
    else if(find1.component == "LC"){
      drawCircuit( elements, "LC"); // RC
    
    }




    return elements;
  };

  

  return (
    <div className="overflow-auto bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">
          Cauer 1 Analysis
        </h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            {/* Add Cauer 1 results display here */}
            <h2 className="text-2xl font-bold mb-4">Results</h2>
            
            {cauer1Results && (
              <div>
                <h2>{`Cauer 1 Results ${find1.component}C`}</h2>
                <ul>
                  {cauer1Results.map((component, index) => (
                    <li key={index}>
                      <strong>Type:</strong> {component.type},
                      <strong> Value:</strong> {component.value.toFixed(4)},
                      <strong> Arrangement:</strong> {component.arrangement}
                    </li>
                  ))}
                </ul>
                
              </div>
            )}
           <div>
                < h2>Cauer 1 Circuit </h2>
                <canvas ref={canvasRef} width={600} height={300} style={{ border: '1px solid black' }}></canvas>
                </div>

                {cauer1Results && (
              <div>
                <h2>Cauer 1 Results RL</h2>
                <ul>
                  {cauerRL.map((component, index) => (
                    <li key={index}>
                      <strong>Type:</strong> {component.type},
                      <strong> Value:</strong> {component.value.toFixed(4)},
                      <strong> Arrangement:</strong> {component.arrangement}
                    </li>
                  ))}
                </ul>
                
              </div>
            )}

<div>
                < h2>Cauer 1 Circuit </h2>
                <canvas ref={canvasRef1} width={600} height={300} style={{ border: '1px solid black' }}></canvas>
                </div>


          </div>
        </div>
      </div>
    </div>
  );
};

export default Cauer2;
