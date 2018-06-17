const router = require('express').Router()
const yelp = require('yelp-fusion')
module.exports = router

const client = yelp.client(process.env.YELP_APP_ID)

router.get('/nearby', async (req, res, next) => {
  try {
    const { latitude, longitude, categories } = req.query
    if (categories) {
      const testData = await client.search({
        term: 'restaurants',
        latitude,
        longitude,
        radius: 1600,
        sort_by: 'rating',
        categories
      })
      res.json(testData)
    } else {
      const testData = await client.search({
        term: 'restaurants',
        latitude,
        longitude,
        radius: 1600,
        sort_by: 'rating'
      })
      res.json(testData)
    }
  } catch (err) {
    next(err)
  }
})

router.get('/:businessId', async (req, res, next) => {
  try {
    const restaurant = await client.business(req.params.businessId)
    res.json(restaurant)
  } catch (err) {
    next(err)
  }
})

// Fullstack coordinates
// [-74.009151, 40.705086,]
