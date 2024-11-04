export function Resistor ({x,y}){
    return (  <g transform={`translate(${x}, ${y})`}>
        {/* Resistor zig-zag line */}
        <line x1="0" y1="0" x2="10" y2="0" stroke="black" strokeWidth="2" />
        <line x1="10" y1="0" x2="15" y2="-10" stroke="black" strokeWidth="2" />
        <line x1="15" y1="-10" x2="25" y2="10" stroke="black" strokeWidth="2" />
        <line x1="25" y1="10" x2="35" y2="-10" stroke="black" strokeWidth="2" />
        <line x1="35" y1="-10" x2="45" y2="10" stroke="black" strokeWidth="2" />
        <line x1="45" y1="10" x2="50" y2="0" stroke="black" strokeWidth="2" />
        <line x1="50" y1="0" x2="60" y2="0" stroke="black" strokeWidth="2" />
      </g>)
}