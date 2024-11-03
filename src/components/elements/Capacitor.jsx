export function Capacitor({x,y}){
  return(
    <svg x={x} y={y} width="50" height="40">
    <line x1="0" y1="0" x2="0" y2="30" stroke="black" strokeWidth="2" />
    <line x1="10" y1="0" x2="10" y2="30" stroke="black" strokeWidth="2" />
  </svg>
  )
}