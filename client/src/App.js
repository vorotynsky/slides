import React from "react";
import './App.css';
import '@fluentui/react/dist/css/fabric.min.css'
import Dictaphone from "./modules/control/Dictaphone";

function App() {
  return (
    <>
      <Dictaphone />
      <div className="App">
        <header className="App-header">
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
        </header>
      </div>
    </>
  );
}

export default App;
