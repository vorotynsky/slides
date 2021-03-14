import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import {ThemeProvider} from '@fluentui/react'
import {BrowserRouter} from 'react-router-dom'

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider applyTo="body">
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
