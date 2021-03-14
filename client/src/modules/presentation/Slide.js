import React, {useEffect, useState} from 'react'
import SlidesApi from "../../api/SlidesApi";
import Title from "./Title";
import {ProgressIndicator} from "@fluentui/react";
import './Slides.css'
import ImageSlide from "./Image";

function SlideImpl(props) {
  const {id: presentationId, renderId} = props
  const [data, setData] = useState({title: null, image: null})
  const api = new SlidesApi()

  useEffect(() => {
    api.currentSlide(presentationId).then(data => setData(data))
  }, [presentationId, renderId])

  console.log(props)

  if (!!data.title)
    return <Title {...data}/>

  if (!!data.image)
    return <ImageSlide {...data}/>

  return (
    <div className="centerTitle">
      <ProgressIndicator label="Загружаем" description="Получение информации от сервера." barHeight={5}/>
    </div>
  )
}


export default class Slide extends React.Component {
  constructor(props) {
    super(props);
    this.state = { renderId: 0}
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      this.setState((prev) => {
        return {...prev, renderId: prev.renderId + 1};
      });
    }, 2000);
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  render() {
    return <SlideImpl id={this.props.id} renderId={this.state.renderId}/>
  }
}
