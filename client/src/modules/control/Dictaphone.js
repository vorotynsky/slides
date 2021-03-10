import React from 'react'
import './Control.css'
import {PrimaryButton, Stack, Text} from "@fluentui/react";
import {SharedColors, NeutralColors, DefaultEffects} from '@fluentui/theme';
import useSpeechRecognition from "../../hooks/useSpeechRecognition";

function DictaphoneInternal(props) {
  let {transcripts, error, start, started, isSupported} = props.speech

  if (!isSupported)
    error = "Speech recognition is not available."

  if (!!error)
    return <div className="center"><Text style={{"color": SharedColors.red10}}>{error}</Text></div>

  if (!started)
    return (
      <div className="center">
        <PrimaryButton onClick={() => start()} text="Start"/>
      </div>
    )

  return (
    <Stack>
      {transcripts?.map((x, index) => {
        let background;
        if (index + 1 === transcripts.length) {
          background = NeutralColors.white;
          return (
            <div style={{background: background, boxShadow: DefaultEffects.elevation16, marginTop: "15px" }} key="last">
              <Text variant="large">{x}</Text>
            </div>
          )
        } else if (index % 2 === 0) {
          background = NeutralColors.gray10;
        } else {
          background = NeutralColors.gray20;
        }
        return (<Text variant="mediumPlus" style={{background: background}} key={index.toString()}>{x}</Text>)
      })}
    </Stack>
  )
}

export default function Dictaphone(props) {
  return (
    <div className="chat" style={{background: NeutralColors.gray10}}>
      <DictaphoneInternal speech={props.speech}/>
    </div>
  )
}
