const {Schema, model} = require('mongoose')

const schema = new Schema({
  title: {type: String, required: true},
  subTitle: {type: String, required: false},
  current: {type: String, required: false},
  prepared: [String],
})

module.exports = model('Presentation', schema)
