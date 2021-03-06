import React from "react";
import './App.css';
import '@fluentui/react/dist/css/fabric.min.css'
import Dictaphone from "./modules/control/Dictaphone";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <Dictaphone />
      </header>
    </div>
  );
}

export default App;
