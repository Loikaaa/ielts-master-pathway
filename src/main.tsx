
// Set up window interfaces for analytics
interface Window {
  dataLayer?: any[];
  fbq?: any;
  gtag?: (...args: any[]) => void;
}

declare global {
  interface Window {
    dataLayer?: any[];
    fbq?: any;
    gtag?: (...args: any[]) => void;
  }
}

import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Add console log for debugging
console.log('Main.tsx executing, attempting to mount React app');

const rootElement = document.getElementById("root");
if (!rootElement) {
  console.error("Root element not found - critical mounting error");
  throw new Error("Root element not found");
}

console.log('Root element found, mounting React app');
createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
console.log('React app mounted');
