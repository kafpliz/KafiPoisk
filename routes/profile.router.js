const express = require('express')
const { API_TOKEN } = process.env
const hbs = require('hbs')

const authControler = require('../authControler')
const authMiddlewareCookie = require('../middlewaree/authMiddlewareCookie')


const router = express.Router()



router.get('/', authMiddlewareCookie, authControler.getUserInfo, async (req, res) => {
  let user = req.user;

  let bookmark = '';
  for (const item in  user.bookmarks) {
     bookmark += `&id=${user.bookmarks[item]}`
  }

  let filmStr= `https://api.kinopoisk.dev/v1.4/movie?page=1&limit=25&selectFields=id&selectFields=name&selectFields=poster${bookmark}&token=${API_TOKEN}`
  let requestAPI = await fetch(filmStr).then(api => api.json()).then(data => dat = data)
  user.films = requestAPI;


 

  res.render("profile-page.hbs", user)
})



module.exports = router