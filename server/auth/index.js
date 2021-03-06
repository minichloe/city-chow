const passport = require('passport')
const router = require('express').Router()
const cors = require('cors')
const FacebookStrategy = require('passport-facebook').Strategy
const { User } = require('../db/models')
module.exports = router

if (!process.env.FACEBOOK_APP_ID || !process.env.FACEBOOK_APP_SECRET) {
  console.log('Facebook app ID / secret not found. Skipping Facebook OAuth.')
} else {
  const facebookConfig = {
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: process.env.FBCALLBACK_URL
  }
  const strategy = new FacebookStrategy(
    facebookConfig,
    async (token, refreshToken, profile, done) => {
      try {
        const info = {
          facebookId: profile.id,
          name: profile.displayName,
          imageUrl: `http://graph.facebook.com/${profile.id}/picture?type=large`
        }
        await User.findOrCreate({
          where: { facebookId: info.facebookId },
          defaults: info
        }).spread(user => done(null, user))
      } catch (err) {
        done()
      }
    }
  )
  passport.use(strategy)

  router.get(
    '/',
    passport.authenticate('facebook', { scope: 'public_profile' })
  )

  router.get(
    '/callback',
    cors(),
    passport.authenticate('facebook', {
      successRedirect: process.env.REDIRECT_URL,
      failureRedirect: process.env.FAILREDIRECT_URL
    })
  )
}

router.post('/logout', (req, res) => {
  req.logout()
  req.session.destroy()
  res.redirect('/')
})

router.get('/me', (req, res) => {
  res.json(req.user)
})
