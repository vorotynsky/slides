import React, {useEffect, useState} from 'react'
import {Image, List} from "@fluentui/react";
import SpeechApi from "../../api/SpeechApi";
import './Control.css'

export default function Images(props) {
  const api = new SpeechApi()
  const [pictures, setPictures] = useState({ photos: [] })
  const { query } = props

  useEffect(() => {
    async function fetch() {
      const result = await api.getImage(query)
      console.log((result?.photos?.length ?? 0) + " pictures loaded")
      return result
    }

    if (!query)
      return;

    fetch()
      .then(r => setPictures(r))
      .catch(e => console.log(e))
  }, [query])

  const onRenderCell = React.useCallback((item, index) => {
    return (
      <div className="imageListGrid">
        <Image src={item}/>
      </div>
    )
  })

  function onSearchChange(element, newValue) {
    // setQuery(newValue)
    console.log(newValue)
  }

  return (
    <div>
      <List
        items={pictures.photos?.map(x => x.src.tiny)}
        onRenderCell={onRenderCell}
        getItemCountForPage={() => 12}
      />
    </div>
  )
}
