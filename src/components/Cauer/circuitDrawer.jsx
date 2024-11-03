function clearCanvas() {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
  }


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
      circuitDrawer = new CircuitDrawer(canvasRef);

    }
    circuitDrawer.drawCircuit(elements);
  };
