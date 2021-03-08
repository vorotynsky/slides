const { Router } = require('express')
const pexels = require('pexels')
const config = require("config");

const router = Router()

router.post('/getPicture', async (req, res) => {
  try {
    let {query} = req.body
    query = encodeURIComponent(query)

    const client = pexels.createClient(config.get('pexelsApiKey'))
    const photos = await client.photos.search({query, locale: "ru-RU", per_page: 12})

    res.json(photos)
  } catch (e) {
    res.status(500).json("Internal server error.")
  }
})

module.exports = router
