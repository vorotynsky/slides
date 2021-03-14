import React from 'react'
import {Stack, StackItem, Text} from "@fluentui/react";
import {FontSizes} from "@fluentui/theme";

export default function Title(props) {
  const {title, subtitle} = props

  console.log(props.title)

  return (
    <Stack style={{margin: '10%', marginBottom: '0%'}}>
      <StackItem align="center">
        <h2 style={{fontSize: FontSizes.size68}}>{title ?? ""}</h2>
        <Stack>

          {(subtitle || "").split('\n').map(x => {
            if (!x) return <p/>
            return (
              <>
                <Text style={{fontSize: FontSizes.size18}}>{x}</Text>
                <br/>
              </>
            )
          })}

        </Stack>
      </StackItem>
    </Stack>
  )
}
