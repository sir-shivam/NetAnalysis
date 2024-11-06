import React, { useEffect, useRef } from 'react';

class CircuitComponent {
  constructor(type, value, position, x1, y1, x2, y2) {
    this.type = type;
    this.value = value;
    this.position = position;
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
    this.wireLength = 50;
  }

  drawValue(ctx) {
    ctx.font = '12px Arial';
    ctx.fillStyle = 'black';
    const text = `${this.value}${this.type === 'resistor' ? 'Ω' : this.type === 'inductor' ? 'H' : 'F'}`;
    ctx.fillText(text, (this.x1 + this.x2) / 2 - 15, this.y1 - 15);
  }
}

class Resistor extends CircuitComponent {
  draw(ctx) {
    // Draw wires
    ctx.beginPath();
    ctx.moveTo(this.x1, this.y1);
    ctx.lineTo(this.x2, this.y2);
    ctx.strokeStyle = '#000';
    ctx.stroke();

    // Draw resistor rectangle
    const width = 40;
    const height = 20;
    ctx.fillStyle = 'red';
    ctx.fillRect(
      this.x1 + (this.x2 - this.x1) / 2 - width / 2,
      this.y1 - height / 2,
      width,
      height
    );

    this.drawValue(ctx);
  }
}

class Inductor extends CircuitComponent {
  draw(ctx) {
    // Draw wires
    ctx.beginPath();
    ctx.moveTo(this.x1, this.y1);
    ctx.lineTo(this.x2, this.y2);
    ctx.strokeStyle = '#000';
    ctx.stroke();

    // Draw inductor rectangle
    const width = 40;
    const height = 20;
    ctx.fillStyle = 'green';
    ctx.fillRect(
      this.x1 + (this.x2 - this.x1) / 2 - width / 2,
      this.y1 - height / 2,
      width,
      height
    );

    this.drawValue(ctx);
  }
}

class Capacitor extends CircuitComponent {
  draw(ctx) {
    // Draw wires
    ctx.beginPath();
    ctx.moveTo(this.x1, this.y1);
    ctx.lineTo(this.x2, this.y2);
    ctx.strokeStyle = '#000';
    ctx.stroke();

    // Draw capacitor rectangle
    const width = 40;
    const height = 20;
    ctx.fillStyle = 'blue';
    ctx.fillRect(
      this.x1 + (this.x2 - this.x1) / 2 - width / 2,
      this.y1 - height / 2,
      width,
      height
    );

    this.drawValue(ctx);
  }
}

class ResonantPair extends CircuitComponent {
  draw(ctx) {
    if (this.position === 'series') {
      // Draw series resonant pair
      const componentLength = 100;
      const middleY = (this.y1 + this.y2) / 2;

      // First element
      if (this.value.R !== undefined) {
        const firstElement = new Resistor('resistor', this.value.R, this.position, this.x1, this.y1, this.x1 + componentLength / 2, this.y1);
        firstElement.draw(ctx);
      } else {
        // Draw wire in place of missing first element
        ctx.beginPath();
        ctx.moveTo(this.x1, this.y1);
        ctx.lineTo(this.x1 + componentLength / 2, this.y1);
        ctx.stroke();
      }

      // Second element
      if (this.value.L !== undefined) {
        const secondElement = new Inductor('inductor', this.value.L, this.position, this.x1 + componentLength / 2, this.y1, this.x2, this.y2);
        secondElement.draw(ctx);
      } else if (this.value.C !== undefined) {
        const secondElement = new Capacitor('capacitor', this.value.C, this.position, this.x1 + componentLength / 2, this.y1, this.x2, this.y2);
        secondElement.draw(ctx);
      } else {
        // Draw wire in place of missing second element
        ctx.beginPath();
        ctx.moveTo(this.x1 + componentLength / 2, this.y1);
        ctx.lineTo(this.x2, this.y2);
        ctx.stroke();
      }

      // Connect the two elements
      ctx.beginPath();
      ctx.moveTo(this.x1 + componentLength / 2, this.y1);
      ctx.lineTo(this.x1 + componentLength / 2, middleY);
      ctx.stroke();
    } else {
      // Draw parallel resonant pair
      const componentLength = 100;
      const middleY = (this.y1 + this.y2) / 2;

      // First element
      if (this.value.R !== undefined) {
        const firstElement = new Resistor('resistor', this.value.R, this.position, this.x1, middleY - 25, this.x1 + componentLength, middleY - 25);
        firstElement.draw(ctx);
      } else {
        // Draw wire in place of missing first element
        ctx.beginPath();
        ctx.moveTo(this.x1, middleY - 25);
        ctx.lineTo(this.x1 + componentLength, middleY - 25);
        ctx.stroke();
      }

      // Second element
      if (this.value.L !== undefined) {
        const secondElement = new Inductor('inductor', this.value.L, this.position, this.x1, middleY + 25, this.x1 + componentLength, middleY + 25);
        secondElement.draw(ctx);
      } else if (this.value.C !== undefined) {
        const secondElement = new Capacitor('capacitor', this.value.C, this.position, this.x1, middleY + 25, this.x1 + componentLength, middleY + 25);
        secondElement.draw(ctx);
      } else {
        // Draw wire in place of missing second element
        ctx.beginPath();
        ctx.moveTo(this.x1, middleY + 25);
        ctx.lineTo(this.x1 + componentLength, middleY + 25);
        ctx.stroke();
      }

      // Connect the two elements
      ctx.beginPath();
      ctx.moveTo(this.x1, middleY - 25);
      ctx.lineTo(this.x1, middleY + 25);
      ctx.stroke();
    }
  }
}

const CircuitCreator = () => {
  const canvasRef = useRef(null);
  const CANVAS_WIDTH = 1200;
  const CANVAS_HEIGHT = 400;
  const START_X = 50;
  const START_Y = 100;
  const VERTICAL_GAP = 150;

  const drawCircuit = (ctx, components) => {
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
      if (comp.position === 'series') {
        // Create and draw series component
        const componentLength = 100;
        const newComponent = comp.type === 'resistor'
          ? new Resistor(comp.type, 5 , comp.position, currentX, pointA.y, currentX + componentLength, pointA.y)
          : comp.type === 'inductor'
            ? new Inductor(comp.type, 5 , comp.position, currentX, pointA.y, currentX + componentLength, pointA.y)
            : comp.type === 'capacitor'
              ? new Capacitor(comp.type, 5 , comp.position, currentX, pointA.y, currentX + componentLength, pointA.y)
              : new ResonantPair(comp.type, 5 , comp.position, currentX, pointA.y, currentX + componentLength, pointB.y);

        newComponent.draw(ctx);

        // Draw parallel wire below
        ctx.beginPath();
        ctx.moveTo(currentX, pointB.y);
        ctx.lineTo(currentX + componentLength, pointB.y);
        ctx.stroke();

        currentX += componentLength;
      } else { // parallel
        // Create and draw parallel component
        const newComponent = comp.type === 'resistor'
          ? new Resistor(comp.type, 5, comp.position, currentX, pointA.y, currentX, pointB.y)
          : comp.type === 'inductor'
            ? new Inductor(comp.type, 5, comp.position, currentX, pointA.y, currentX, pointB.y)
            : comp.type === 'capacitor'
              ? new Capacitor(comp.type, 5, comp.position, currentX, pointA.y, currentX, pointB.y)
              : new ResonantPair(comp.type, 5, comp.position, currentX, pointA.y, currentX, pointB.y);

        newComponent.draw(ctx);

        // Draw extension lines
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
    });

    // Draw final vertical connection if needed
    if (components[components.length - 1].position === 'series') {
      ctx.beginPath();
      ctx.moveTo(currentX, pointA.y);
      ctx.lineTo(currentX, pointB.y);
      ctx.stroke();
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // Example circuit data
    const circuitWithInvalidValue = [
        { type: 'resistor', value: 3, position: 'series' },
        { type: 'resonant_pair', R: 1, C: 1, position: 'parallel' },
        { type: 'capacitor', value: 0.125, position: 'series' }
      ];

    const circuit2 = [
      { type: 'resistor', value: 3, position: 'series' },
      { type: 'resonant_pair', R: 1, L: 0.3333333333333333, position: 'parallel' },
      { type: 'capacitor', value: 8, position: 'series' }
    ];

    drawCircuit(ctx, circuitWithInvalidValue);
    // drawCircuit(ctx, circuit2);
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

export default CircuitCreator;