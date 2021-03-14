import React, {useContext, useState} from 'react'
import {useHistory} from 'react-router-dom'
import {PrimaryButton, Stack, StackItem, TextField} from '@fluentui/react'
import SlidesApi from '../../api/SlidesApi'
import {AuthControlContext} from '../../contexts/control'

export default function StartSlides() {
  const [title, setTitle] = useState("")
  const [subTitle, setSubTitle] = useState(null)
  const [prepared, setPrepared] = useState("")
  const history = useHistory()
  const {login} = useContext(AuthControlContext)

  function onStart() {
    const api = new SlidesApi()
    const preparedLinks = Array.from(prepared.split('\n').map(x => x.trim()).filter(x => !!x))
    api.createSlides(title, subTitle, preparedLinks).then(x => {
      login(x.access)
      history.push('/control')
    }).catch(err => {
      console.error(err)
      alert('error')
    })
  }

  return (
    <Stack style={{marginTop: '10%'}}>
      <StackItem align="center">
        <h2>Start presentation</h2>
      </StackItem>

      <StackItem align="center">
        <TextField label="title" required value={title} onChange={(e, value) => {setTitle(value)}} />
      </StackItem>

      <StackItem align="center">
        <TextField label="sub title" multiline resizable={false} onChange={(e, value) => {setSubTitle(value)}}  />
      </StackItem>

      <StackItem align="center">
        <TextField label="links to prepared slides" multiline onChange={(e, value) => {setPrepared(value)}}  />
      </StackItem>

      <StackItem align="center" style={{margin: '10px'}}>
        <PrimaryButton text="start" onClick={onStart} />
      </StackItem>
    </Stack>
  )
}
