import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {ThemeProvider} from "@fluentui/react";

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider applyTo="body">
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
