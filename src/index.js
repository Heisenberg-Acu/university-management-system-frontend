import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import AuthProvider from './authContext/AuthProvider'
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.Suspense>
    <React.StrictMode>
      <AuthProvider>
        <App />
      </AuthProvider>
    </React.StrictMode>
  </React.Suspense>

);
