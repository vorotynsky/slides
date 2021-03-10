import React from 'react'
import './Control.css';
import Dictaphone from "./Dictaphone";
import Images from "./Images";
import useSpeechRecognition from "../../hooks/useSpeechRecognition";

export default function ControlMain() {
  const speech = useSpeechRecognition()

  return (
    <>
      <Dictaphone speech={speech} />
      <div className="app">
        <Images query="чайка"/>
      </div>
    </>
  )
}
