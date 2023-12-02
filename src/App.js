import * as React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './styles/App.css';
import ReactDOM from 'react-dom/client';
const Navbar = React.lazy(() => import("./components/common/Navbar"));
const LandingPage = React.lazy(() => import("./views/LandingPage/LandingPage"));
function App() {
  return (
    <BrowserRouter>
      <div className='app'>
        <Routes>
          <Route path="*" element={<LandingRoutes />} />
        </Routes>
      </div>
      </BrowserRouter>
  );
}
const LandingRoutes = () => {
  return(
    <div>
      <Navbar></Navbar>
      <Routes>
        <Route path='/' element={<LandingPage/>}/>
      </Routes>
    </div>
  );
}
export default App;
