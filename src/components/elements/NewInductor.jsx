export function NewInductor({x,y}){
   return   (  <svg x={x} y={y} width="40" height="100">
    {/* Downward curling inductor with more curls */}
    <path d="M10,0 Q15,5 10,10 Q5,15 10,20 Q15,25 10,30 Q5,35 10,40 Q15,45 10,50 Q5,55 10,60 Q15,65 10,70" fill="none" stroke="black" strokeWidth="2" />
    <line x1="10" y1="70" x2="10" y2="90" stroke="black" strokeWidth="2" /> {/* Vertical line connecting to bottom */}
  </svg>)
 }
