import axios from 'axios'

export default class SlidesApi {
  createSlides(title) {
    return axios.post('/api/slides/create', {title})
      .then(result => result.data)
      .catch(err => {throw new err})
  }
}
