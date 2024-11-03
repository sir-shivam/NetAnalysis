export function Inductor({x,y}){
   return(
    <svg x={x} y={y} width="50" height="20">
    <path
    d="M0 10 C5 0, 10 20, 15 10 
         C20 0, 25 20, 30 10 
         C35 0, 40 20, 45 10 
         C50 0, 55 20, 60 10 
         C65 0, 70 20, 75 10"
    fill="none"
    stroke="black"
    strokeWidth="2"
  />
  </svg>
   )
}