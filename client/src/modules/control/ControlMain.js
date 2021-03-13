import React, {useEffect, useState} from 'react'
import './Control.css';
import Dictaphone from "./Dictaphone";
import Images from "./Images";
import useSpeechRecognition from "../../hooks/useSpeechRecognition";

export default function ControlMain() {
  const speech = useSpeechRecognition()
  const {transcripts, started} = speech
  const [words, updateWords] = useState({})

  useEffect(() => {
    const last = transcripts[transcripts.length - 1] || ""
    let myWords = {...words}

    Object.keys(myWords).forEach(key => {
      myWords[key] *= 0.95
    })

    const updated = last.split(' ')
      .filter(x => !!x)
      .map(x => x.toLowerCase())
      .reduce((r, a) => {
        if (!a) return r

        r[a] = (r[a] || 0) + 1
        return r
      }, {...myWords});

    updateWords(updated)
  }, [transcripts])

  useEffect(() => {
    console.info(`Speech recognition ${started ? "started" : "stopped"}`)
  }, [started])

  console.log(words)
  const maxWord = Object.keys(words).reduce((a, b) => words[a] > words[b] ? a : b, "");

  return (
    <>
      <Dictaphone speech={speech} />
      <div className="app">
        <Images query={maxWord}/>
      </div>
    </>
  )
}
