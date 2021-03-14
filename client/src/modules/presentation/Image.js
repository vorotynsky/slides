import React from 'react'
import {Image, ImageFit} from "@fluentui/react";

export default function ImageSlide(props) {
  const {image} = props

  return (
    <div className="imageFull">
      <Image imageFit={ImageFit.centerCover} maximizeFrame={true} src={image} />
    </div>
  )
}
