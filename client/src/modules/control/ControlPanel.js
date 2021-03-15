import React, {useContext, useState} from 'react'
import {Stack, StackItem, PrimaryButton, Slider, TextField, DetailsList} from "@fluentui/react";
import SpeechApi from "../../api/SpeechApi";
import {AuthControlContext} from "../../contexts/control";

export function WordList(props) {
  const {words, updateWords} = props

  return <DetailsList
    items={Object.entries(words).map(x => {
      return {word: x[0], count: x[1]}
    })}
    colums={[
      {key: "column_word", name: 'Word', fieldName: 'word'},
      {key: "column_count", name: 'Count', fieldName: 'count'}
    ]}
    onItemInvoked={(item) => {
      const input = prompt('Enter new value, or empty if not change: ')?.trim()
      const num = Number(input)
      if (!!input && !!num) {
        updateWords({...words, [item.word]: num})
      }
    }}
  />
}

export function ControlPanel(props) {
  const {id, onChange, settings} = props
  const [picture, setPicture] = useState('')
  const url = window.location.hostname + '/presentation/' + id

  const api = new SpeechApi(useContext(AuthControlContext).token)

  function onSelect() {
    if (!picture)
      return alert('wrong picture')

    api.selectSlide(picture).then(x => {
      setPicture(null)
      alert('selected');
    }).catch(err => console.error(err))
  }

  return (
    <Stack style={{margin: '5%'}}>
      <TextField label="Presentation url" readOnly value={url} />
      <Slider label="Memory" min={0} max={1} step={0.01} showValue valueFormat={(x) => x * 100 + '%'} onChange={x => onChange('memory', x)} value={settings.memory}/>

      <StackItem style={{marginTop: '20px', marginBottom: '5px'}}>
        <TextField label="select picture manually" onChange={(_, x) => setPicture(x)}/>
      </StackItem>
      <PrimaryButton text="select this picture" onClick={onSelect}/>
    </Stack>
  )
}
