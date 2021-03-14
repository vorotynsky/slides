import axios from 'axios'

export default class SlidesApi {
  createSlides(title, subTitle, prepared) {
    return axios.post('/api/slides/create', {title, subTitle, prepared})
      .then(result => result.data)
      .catch(err => {throw err})
  }

  currentSlide(id) {
    return axios.get(`/api/slides/getSlide/${id}`)
      .then(result => result.data)
      .catch(err => {throw err})
  }

  getInfo(token) {
    return axios.get('/api/slides/info', {headers: {'Authorization': `Bearer ${token}`}})
      .then(result => result.data)
      .catch(err => {throw err})
  }
}
