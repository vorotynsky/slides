import React, {useEffect, useState} from 'react'

export default function useSpeechRecognition() {
  const [recognition, setRecognition] = useState(null)
  const [error, setError] = useState(null)
  const [started, setStarted] = useState(false)
  const [transcripts, setTranscripts] = useState([])
  const [current, setCurrent] = useState("")

  useEffect(() => {
    try {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
      let recognition = new SpeechRecognition();

      recognition.continuous = true
      recognition.interimResults = true
      recognition.lang = "ru-RU"
      recognition.maxAlternatives = 1

      setRecognition(recognition)

      recognition.onresult = event => {
        const result = event.results[event.resultIndex]
        const transcript = result[0].transcript
        if (result.isFinal) {
          setTranscripts(prev => prev.concat(transcript))
          setCurrent("")
        }
        else {
          setCurrent(transcript)
        }
      }
      recognition.onerror = e => setError(e)
      recognition.onstart = () => setStarted(true)
      recognition.onend = () => setStarted(false)
    } catch (ReferenceError) {
      setRecognition(null)
    }
  }, [])

  const start = () => {
    navigator.mediaDevices.getUserMedia({ audio: true, video: false })
      .catch(reason => this.setState({...this.state, error: reason.toString()}));

    console.log(recognition)
    recognition?.start()
  }

  return {transcripts, current, error, started, start, isSupported: recognition != null }
}
