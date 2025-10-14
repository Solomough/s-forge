import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

// S-Forge Note: The main entry point strictly handles mounting the app.
// Future enhancements (e.g., Redux providers, Router setup) will wrap the <App /> component here.

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
