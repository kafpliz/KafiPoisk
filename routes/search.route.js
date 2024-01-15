const express = require('express')
const { API_TOKEN } = process.env
const hbs = require('hbs')


const router = express.Router()

router.get('/', async (req, res) => {
  res.render('search-page.hbs')
})

router.post('/api', async (req, res)=> {
    const request = req.body;
    console.log(request.param);
    let api = `https://api.kinopoisk.dev/v1.4/movie/search?page=1&limit=12&query=${request.param}&token=${API_TOKEN}`
   
    let requestAPI = await fetch(api).then(api => api.json()).then(data => dat = data)
  
    res.status(200).send(requestAPI).json()
  
})
module.exports = router