import axios from 'axios'

export default class SpeechApi {
  getImage(query) {
    return axios.post('/api/control/speech/getPicture', { query })
      .then(result => result.data)
      .catch(error => { throw error.response; });
  }
}
