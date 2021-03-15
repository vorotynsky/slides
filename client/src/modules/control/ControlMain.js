import React, {useContext, useEffect, useState} from 'react'
import './Control.css';
import Dictaphone from "./Dictaphone";
import {Images, PreparedImages} from "./Images";
import useSpeechRecognition from "../../hooks/useSpeechRecognition";
import {AuthControlContext} from "../../contexts/control";
import SlidesApi from "../../api/SlidesApi";
import {Pivot, PivotItem} from "@fluentui/react";
import {ControlPanel, WordList} from "./ControlPanel";

export default function ControlMain() {
  const speech = useSpeechRecognition()
  const {transcripts, started} = speech
  const [words, updateWords] = useState({})
  const [settings, changeSettings] = useState({memory: 0.95})

  const {token} = useContext(AuthControlContext)
  const api = new SlidesApi()
  const [info, setInfo] = useState({_id: null, title: "", subTitle: "", prepared: []})

  useEffect(() => {
    const last = transcripts[transcripts.length - 1] || ""
    let myWords = {...words}

    Object.keys(myWords).forEach(key => {
      myWords[key] *= settings.memory
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
    api.getInfo(token).then(x => setInfo(x))
      .catch(err => {
        console.error(err)
        alert('info fetch error')
    })
  }, [token])

  useEffect(() => {
    console.info(`Speech recognition ${started ? "started" : "stopped"}`)
  }, [started])

  const maxWord = Object.keys(words).reduce((a, b) => words[a] > words[b] ? a : b, "");

  const onChange = React.useCallback((name, value) => {
    changeSettings({...settings, [name]: value})
  }, [])

  return (
    <>
      <Dictaphone speech={speech}/>
      <div className="App">
        <Pivot>
          <PivotItem headerText="Speech based images">
            <Images query={maxWord}/>
          </PivotItem>
          <PivotItem headerText="Prepared images">
            <PreparedImages pictures={info.prepared}/>
          </PivotItem>
          <PivotItem headerText="Control">
            <ControlPanel onChange={onChange} id={info._id} settings={settings}/>
          </PivotItem>
          <PivotItem headerText="Words">
            <WordList words={words} updateWords={updateWords} />
          </PivotItem>
        </Pivot>
      </div>
    </>
  )
}
