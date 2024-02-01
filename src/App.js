import * as React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import {Layout} from 'antd';
import './styles/App.css';
import './styles/bootstrap-grid.css'
import ReactDOM from 'react-dom/client';
///components
const Navbar = React.lazy(() => import("./components/common/Navbar"));
const Footer =  React.lazy(() => import("./components/common/Footer"));
//views
const LandingPage = React.lazy(() => import("./views/LandingContent/LandingPage"));
const LoginPage = React.lazy(() => import('./views/LandingContent/LoginPage'));

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
      <Navbar />
      <Routes>
        <Route path='/' element={<LandingPage/>}/>
        <Route path='/login' element={<LoginPage />}/>
        <Route path='*' element={<Navbar/>}/>
      </Routes>
      <Footer />
    </Layout>
  );
}
export default App;
