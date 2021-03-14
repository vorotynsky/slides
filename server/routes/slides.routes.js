const { Router } = require('express')
const config = require('config')
const jwt = require('jsonwebtoken')
const Presentation = require('../models/Presentation')
const { Types } = require('mongoose')

const router = Router()

router.post('/create', async (req, res) => {
  try {
    const {title, subTitle, prepared} = req.body

    const presentation = new Presentation({title, subTitle: subTitle || null, prepared: prepared || []})
    await presentation.save()

    const id = presentation._id.toString()
    const access = jwt.sign({id}, config.get('jwtSecret'), {expiresIn: "2h"})

    res.json({presentation, access})
  } catch (e) {
    res.status(500).send()
  }
})

router.get('/info', async (req, res) => {
  try {
    const {id} = req.jwt
    if (!id) return res.status(401).send()

    res.json(await Presentation.findById(Types.ObjectId(id)))
  } catch (e) {
    res.status(500).send()
  }
})

router.post('/selectSlide', async (req, res) => {
  try {
    const {image} = req.body
    const {id} = req.jwt

    if (!image) return res.status(400).send()

    const presentation = await Presentation.findById(new Types.ObjectId(id))
    presentation.current = image
    await presentation.save()

    res.status(200).send()
  } catch (e) {
    console.log(e)
    res.status(500).send()
  }
})

router.get('/getSlide/:id', async (req, res) => {
  try {
    const id = req.params.id
    if (!id) return res.status(404).send()

    const presentation = await Presentation.findById(new Types.ObjectId(id))
    if (!presentation) return res.status(404).send()

    if (!!presentation.current)
      res.json({image: presentation.current})

    res.json({title: presentation.title, subTitle: presentation.subTitle})
  } catch (e) {
    res.status(500).send()
  }
})

module.exports = router
