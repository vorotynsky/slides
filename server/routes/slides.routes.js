const { Router } = require('express')
const config = require('config')
const jwt = require('jsonwebtoken')
const Presentation = require('../models/Presentation')
const { Types } = require('mongoose')

const router = Router()

router.post('/create', async (req, res) => {
  try {
    const {title} = req.body

    const presentation = new Presentation({title: title})
    await presentation.save()

    const id = presentation._id.toString()
    const access = jwt.sign({id}, config.get('jwtSecret'), {expiresIn: "2h"})

    res.json({presentation, access})
  } catch (e) {
    console.log(e)
    res.status(500).send()
  }
})

module.exports = router
