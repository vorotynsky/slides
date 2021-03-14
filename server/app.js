const bodyParser = require('body-parser')
const express = require('express')
const config = require('config')
const mongoose = require('mongoose')

const app = express()

app.use(express.urlencoded())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json())

app.use('/api/control/speech/', require('./routes/speech.routes'))
app.use('/api/slides/', require('./routes/slides.routes'))

const PORT = config.get('port') || 5000

async function start() {
  try {
    await mongoose.connect(config.get('mongoUri'), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    app.listen(PORT, () => {
      console.log(`App has been started on port ${PORT}.`)
    })
  } catch (e) {
    console.log(e)
    process.exit(1)
  }
}

start().then(r => console.log("App started."))

module.exports = app
