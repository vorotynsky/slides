const {Schema, model} = require('mongoose')

const schema = new Schema({
  title: {type: String, required: true},
  current: {type: String, required: false}
})

module.exports = model('Presentation', schema)
