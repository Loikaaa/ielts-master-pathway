
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

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Root element not found");

createRoot(rootElement).render(<App />);
