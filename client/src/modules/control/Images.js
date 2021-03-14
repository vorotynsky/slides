import React, {useContext, useEffect, useState} from 'react'
import {Image, List} from "@fluentui/react";
import SpeechApi from "../../api/SpeechApi";
import './Control.css'
import {AuthControlContext} from "../../contexts/control";

export default function Images(props) {
  const {token} = useContext(AuthControlContext)
  const api = new SpeechApi(token)
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


  function selectImage(item) {
      api.selectSlide(item.large2x)
        .then(r => alert('selected!'))
        .catch(err => {
          alert('error')
          console.log(err)
        })
  }

  const onRenderCell = React.useCallback((item, index) => {
    return (
      <div className="imageListGrid" onClick={() => selectImage(item)}>
        <Image src={item.tiny} />
      </div>
    )
  })

  return (
    <div>
      <List
        items={pictures.photos?.map(x => x.src)}
        onRenderCell={onRenderCell}
        getItemCountForPage={() => 12}
      />
    </div>
  )
}
