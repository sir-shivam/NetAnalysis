import React, { useEffect, useRef } from 'react';

class Component {
  constructor(type, value, x1, y1, x2, y2) {
    this.type = type;
    this.value = value.toFixed(3);
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
    this.wireLength = 50;
  }

  drawValue(ctx, isVertical = false) {
    ctx.font = '12px Arial';
    ctx.fillStyle = 'black';
    const text = `${this.value}${this.type === 'R' ? 'Ω' : this.type === "L" ? 'H' : 'F'}`;
    
    if (isVertical) {
      // Position value label to the right of vertical component
      ctx.fillText(text, this.x1 + 15, (this.y1 + this.y2) / 2);
    } else {
      // Position value label above horizontal component
      ctx.fillText(text, (this.x1 + this.x2) / 2 - 15, this.y1 - 15);
    }
  }
}

class Resistor extends Component {
  draw(ctx, isVertical = false) {
    // Draw wires
    ctx.beginPath();
    ctx.moveTo(this.x1, this.y1);
    ctx.lineTo(this.x2, this.y2);
    ctx.strokeStyle = '#000';
    ctx.stroke();

    // Draw resistor rectangle
    const width = isVertical ? 20 : 40;
    const height = isVertical ? 40 : 20;
    ctx.fillStyle = 'red';
    if (isVertical) {
      ctx.fillRect(
        this.x1 - width / 2,
        this.y1 + (this.y2 - this.y1) / 2 - height / 2,
        width,
        height
      );
    } else {
      ctx.fillRect(
        this.x1 + (this.x2 - this.x1) / 2 - width / 2,
        this.y1 - height / 2,
        width,
        height
      );
    }
    
    // Draw value
    this.drawValue(ctx, isVertical);
  }
}

class Inductor extends Component {
  draw(ctx, isVertical = false) {
    // Draw wires
    ctx.beginPath();
    ctx.moveTo(this.x1, this.y1);
    ctx.lineTo(this.x2, this.y2);
    ctx.strokeStyle = '#000';
    ctx.stroke();

    // Draw inductor rectangle
    const width = isVertical ? 20 : 40;
    const height = isVertical ? 40 : 20;
    ctx.fillStyle = 'green';
    if (isVertical) {
      ctx.fillRect(
        this.x1 - width / 2,
        this.y1 + (this.y2 - this.y1) / 2 - height / 2,
        width,
        height
      );
    } else {
      ctx.fillRect(
        this.x1 + (this.x2 - this.x1) / 2 - width / 2,
        this.y1 - height / 2,
        width,
        height
      );
    }
    
    // Draw value
    this.drawValue(ctx, isVertical);
  }
}

class Capacitor extends Component {
    draw(ctx, isVertical = false) {
      // Draw wires
      ctx.beginPath();
      ctx.moveTo(this.x1, this.y1);
      ctx.lineTo(this.x2, this.y2);
      ctx.strokeStyle = '#000';
      ctx.stroke();
  
      // Draw inductor rectangle
      const width = isVertical ? 20 : 40;
      const height = isVertical ? 40 : 20;
      ctx.fillStyle = 'blue';
      if (isVertical) {
        ctx.fillRect(
          this.x1 - width / 2,
          this.y1 + (this.y2 - this.y1) / 2 - height / 2,
          width,
          height
        );
      } else {
        ctx.fillRect(
          this.x1 + (this.x2 - this.x1) / 2 - width / 2,
          this.y1 - height / 2,
          width,
          height
        );
      }
      
      // Draw value
      this.drawValue(ctx, isVertical);
    }
  }

const CircuitDiagram = ({cauerResult}) => {
  const canvasRef = useRef(null);
  const CANVAS_WIDTH = 1200;
  const CANVAS_HEIGHT = 400;
  const START_X = 50;
  const START_Y = 100;
  const VERTICAL_GAP = 150;

  const drawCircuit = (ctx, components) => {
    console.log(components , "check");
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    const pointA = { x: START_X, y: START_Y };
    const pointB = { x: START_X, y: START_Y + VERTICAL_GAP };

    // Draw initial wires
    ctx.beginPath();
    ctx.moveTo(START_X, pointA.y);
    ctx.lineTo(START_X + 50, pointA.y);
    ctx.moveTo(START_X, pointB.y);
    ctx.lineTo(START_X + 50, pointB.y);
    ctx.strokeStyle = '#000';
    ctx.stroke();

    let currentX = START_X + 50;

    components.forEach((comp, index) => {
        if (comp.arrangement === 'series') {
          // Create and draw series component
          const componentLength = 100;
          const newComponent = comp.type === 'R' 
            ? new Resistor(comp.type, comp.value, currentX, pointA.y, currentX + componentLength, pointA.y)
            : comp.type === 'L' 
              ? new Inductor(comp.type, comp.value, currentX, pointA.y, currentX + componentLength, pointA.y)
              : new Capacitor(comp.type, comp.value, currentX, pointA.y, currentX + componentLength, pointA.y);
          
          newComponent.draw(ctx, false);
      
          // Draw parallel wire below
          ctx.beginPath();
          ctx.moveTo(currentX, pointB.y);
          ctx.lineTo(currentX + componentLength, pointB.y);
          ctx.stroke();
      
          currentX += componentLength;
        } else { // parallel
          // Create and draw parallel component
          const newComponent = comp.type === 'R'
            ? new Resistor(comp.type, comp.value, currentX, pointA.y, currentX, pointB.y)
            : comp.type === 'L'
              ? new Inductor(comp.type, comp.value, currentX, pointA.y, currentX, pointB.y)
              : new Capacitor(comp.type, comp.value, currentX, pointA.y, currentX, pointB.y);
          
          newComponent.draw(ctx, true);
      
          // Draw extension lines if not the last component
          if (index < components.length - 1) {
            ctx.beginPath();
            // Top extension
            ctx.moveTo(currentX, pointA.y);
            ctx.lineTo(currentX + 50, pointA.y);
            // Bottom extension
            ctx.moveTo(currentX, pointB.y);
            ctx.lineTo(currentX + 50, pointB.y);
            ctx.stroke();
            currentX += 50;
          }
        }
      });
      ;

    console.log(components)
    // Draw final vertical connection if needed
    if (components[components.length - 1].arrangement === 'series') {
      ctx.beginPath();
      ctx.moveTo(currentX, pointA.y);
      ctx.lineTo(currentX, pointB.y);
      ctx.stroke();
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // const components = [
    //   {type: 'R', value: 3, arrangement: 'series'},
    //   {type: 'L', value: 0.111, arrangement: 'parallel'},
    //   {type: 'R', value: 27, arrangement: 'series'},
    //   {type: 'L', value: 0.014, arrangement: 'parallel'}
    // ];

    drawCircuit(ctx, cauerResult);
    console.log(cauerResult , "result in circuit");
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto">
      <canvas 
        ref={canvasRef} 
        width={CANVAS_WIDTH} 
        height={CANVAS_HEIGHT}
        className="border border-gray-300"
      />
    </div>
  );
};

export default CircuitDiagram;