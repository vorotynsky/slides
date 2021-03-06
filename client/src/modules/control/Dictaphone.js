import React from 'react'
import {PrimaryButton, Stack, Text} from "@fluentui/react";

export default class Dictaphone extends React.Component {
  recognition
  isAndroid

  constructor(props) {
    super(props);
    try {
      // eslint-disable-next-line no-undef
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
      this.recognition = new SpeechRecognition()

      this.recognition.continuous = true
      this.recognition.interimResults = true
      this.recognition.lang = "ru-RU"
      this.recognition.maxAlternatives = 1

      const dictaphone = this;
      this.recognition.onresult = event => dictaphone.onResult(event)
      this.recognition.onerror = e => dictaphone.onError(e)
      this.recognition.onstart = () => dictaphone.onStart()
      this.recognition.onend = () => dictaphone.onStop()

    } catch (ReferenceError) {
      this.recognition = null
    }

    this.isAndroid = navigator.userAgent.toLowerCase().indexOf("android") > -1;

    this.setState({error: null, isRunning: false, transcripts: []})
  }

  onResult(event) {
    this.setState({...this.state, transcripts: (Array.from(event.results, (x) => x[0].transcript))})
  }

  onError(event) {
    this.setState({...this.state, error: event.error})
  }

  onStart() {
    this.setState({...this.state, isRunning: true})
  }

  onStop() {
    this.setState({...this.state, isRunning: false})
    if (this.isAndroid)
      this.recognition.start()
  }

  componentDidMount() {
    navigator.mediaDevices.getUserMedia({ audio: true, video: false }).catch(() => alert("error"));

  }

  render() {
    if (this.recognition == null)
      return <Text>Speech recognition is not available.</Text>

    if (!this.state?.isRunning)
      return <PrimaryButton onClick={() => this.recognition.start()} text="Start"/>

    if (!!this.state?.error)
      return <Text>{this.state.error}</Text>

    return (
      <Stack>
        {this.state?.transcripts?.map((x) => <Text>{x}</Text>)}
      </Stack>
    )
  }
}
