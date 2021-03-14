import React from 'react'
import {Stack, StackItem, Text} from "@fluentui/react";
import {FontSizes} from "@fluentui/theme";

export default function Title(props) {
  const {title, subTitle} = props

  return (
    <Stack style={{margin: '10%', marginBottom: '0%'}}>
      <StackItem align="center">
        <h2 style={{fontSize: FontSizes.size68}}>{title ?? ""}</h2>
        <Stack>

          {(subTitle || "").split('\n').map(x => {
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
