import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { initScreenScaling } from './utils/screenScaling';
import './styles/global.css';

// Initialize screen scaling for large displays
initScreenScaling();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
); 