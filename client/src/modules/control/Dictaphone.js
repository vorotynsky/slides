import React from 'react'
import './Dictaphone.css'
import {PrimaryButton, Stack, Text} from "@fluentui/react";
import {SharedColors, NeutralColors, DefaultEffects} from '@fluentui/theme';

class DictaphoneInternal extends React.Component {
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
    navigator.mediaDevices.getUserMedia({ audio: true, video: false })
      .catch(reason => this.setState({...this.state, error: reason.toString()}));

  }

  render() {
    let error = null

    if (!!this.state?.error)
      error = this.state.error
    if (this.recognition == null)
      error = "Speech recognition is not available."

    if (!!error)
      return <div className="center"><Text style={{"color": SharedColors.red10}}>{error}</Text></div>

    if (!this.state?.isRunning)
      return (
        <div className="center">
          <PrimaryButton onClick={() => this.recognition.start()} text="Start"/>
        </div>
      )

    return (
      <Stack>
        {this.state?.transcripts?.map((x, index) => {
          let background;
          if (index + 1 === this.state.transcripts.length) {
            background = NeutralColors.white;
            return (
              <div style={{background: background, boxShadow: DefaultEffects.elevation16, marginTop: "15px" }}>
                <Text variant="large">{x}</Text>
              </div>
            )
          } else if (index % 2 === 0) {
            background = NeutralColors.gray10;
          } else {
            background = NeutralColors.gray20;
          }
          return (<Text variant="mediumPlus" style={{background: background}}>{x}</Text>)
        })}
      </Stack>
    )
  }
}

export default function Dictaphone() {
  return (
    <div className="chat" style={{background: NeutralColors.gray10}}>
      <DictaphoneInternal />
    </div>
  )
}
