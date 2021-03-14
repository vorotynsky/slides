import axios from 'axios'

export default class SpeechApi {
  constructor(token) {
    this.token = token
  }

  getImage(query) {
    return axios.post('/api/control/speech/getPicture', { query })
      .then(result => result.data)
      .catch(error => { throw error.response; });
  }


  selectSlide(image) {
    return axios.post(
      `/api/slides/selectSlide`,
      {image},
      {headers: { 'Authorization': `Bearer ${this.token}` }})
      .then(result => result.data)
      .catch(err => {throw err})
  }
}
