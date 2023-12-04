import * as React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import {Layout} from 'antd';
import './styles/App.css';
import './styles/bootstrap-grid.css'
import ReactDOM from 'react-dom/client';
///components
const Navbar = React.lazy(() => import("./components/common/Navbar"));

//views
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
    <Layout>
      <Navbar></Navbar>
      <Routes>
        <Route path='/' element={<LandingPage/>}/>
        <Route path='*' element={<Navbar/>}/>
      </Routes>
    </Layout>
  );
}
export default App;
