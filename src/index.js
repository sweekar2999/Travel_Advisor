import React from 'react';
import ReactDOM from 'react-dom/client'; // Change here for React 18
import App from './App';


const root = ReactDOM.createRoot(document.getElementById('root')); // New way to create a root
root.render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>
);
