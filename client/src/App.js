import React from "react";
import './App.css';
import '@fluentui/react/dist/css/fabric.min.css'

import Dictaphone from "./modules/control/Dictaphone";
import Images from "./modules/control/Images";

function App() {
  return (
    <>
      <Dictaphone />
      <div className="App">
          <Images query="чайка"/>
      </div>
    </>
  );
}

export default App;
