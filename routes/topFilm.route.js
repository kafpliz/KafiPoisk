const express = require('express')
const { API_TOKEN } = process.env
const hbs = require('hbs')


const router = express.Router()

router.get('/', async (req, res) => {
        let pars = req.query;
        let apiPage = Object.keys(pars).length === 0 ? 1 : pars.page;
        const api = `https://api.kinopoisk.dev/v1.4/movie?lists=top250&limit=51&page=${apiPage}&token=${API_TOKEN}`
        let requestAPI = await fetch(api).then(api => api.json()).then(data => dat = data)

    hbs.registerHelper('translater', (str) => {
        let translate = ''
        switch (str) {
            case 'cartoon':
                translate = 'мультик';
                break;
            case 'movie':
                translate = 'фильм';
                break;
            case 'anime':
                translate = 'аниме';
                break;
            case 'tv-series':
                translate = 'сериал';
                break;
            case 'animated-series':
                translate = 'мультсериал';
                break;
            default:
                translate = 'неизвезстно'
                break;

        }
        return new hbs.SafeString(translate)
    })

    hbs.registerHelper('pagination', (pages) => {

        let page = '';
        for (let i = 1; i <= pages; i++) {
            page += `<li class="page">${i}</li>`


        }

        return new hbs.SafeString(page)
    })
    hbs.registerHelper('rating', (num) => {
        return num.toFixed(1)
    })


    res.render('topFilm.hbs', requestAPI)
})


module.exports = router