import axios from 'axios'

export default class SlidesApi {
  createSlides(title) {
    return axios.post('/api/slides/create', {title})
      .then(result => result.data)
      .catch(err => {throw new err})
  }

  currentSlide(id) {
    return axios.get(`/api/slides/getSlide/${id}`)
      .then(result => result.data)
      .catch(err => {throw err})
  }
}
