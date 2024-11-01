import React, { useState } from 'react';
// import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';

// import NetworkAnalyzer from "./final";
// import NetworkAnalyzer2 from "./with s approach";
// import OptimizedRootFinder from "./1";
import OptimizedRootFinderlatest from "../../final";
import Cauer2Synthesis from "../../couer2";
import CauerCalculator from "../../newCouer";
import PolynomialInput from './components/PolynomialInput';
import AnalysisResults from './components/AnalysisResults';
import Foster1 from './components/Foster1';
import Foster2 from './components/Foster2';
import Cauer1 from './components/Cauer1';
import Cauer2 from './components/Cauer2';
import HomePage from './components/Home';
// import OptimizedRootFinder from "./roots";
// import NetworkAnalyzerroots from "./all roots and PF";
// import NetworkAnalyzeraftermorethan3 from "./1"; 


// function App() {
//     return (
//       <div className="App">
//         <BrowserRouter>
//               <Routes>
//                 {/* <Route path="/home" element={<FosterCircuitSolver />} /> */}
//                 {/* <Route path="/" element={<CauerCalculator />} /> */}
//                 {/* <Route path="/2nd" element={<NetworkAnalyzer2 />} /> */}
//                 <Route path="/root" element={<OptimizedRootFinderlatest />} />
                // <Route path="/couer2" element={<Cauer2Synthesis />} />

//                 {/* <Route path="/root" element={<OptimizedRootFinder />} /> */}
//                 {/* <Route path="/more" element={<NetworkAnalyzeraftermorethan3/>} /> */}
  
//               </Routes>
//         </BrowserRouter>
//       </div>
//     );
//   }
  
  
const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/result" element={<Cauer2 />} />
          <Route path="/result2" element={<Cauer1/>} />

          {/* <Route path="/analysis" element={<AnalysisResults />} />
          <Route path="/foster1" element={<Foster1 />} />
          <Route path="/foster2" element={<Foster2 />} />
          <Route path="/cauer1" element={<Cauer1 />} />
          <Route path="/cauer2" element={<Cauer2 />} /> */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;



  // export default App;