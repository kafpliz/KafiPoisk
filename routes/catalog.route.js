const express = require('express')
const { API_TOKEN } = process.env
const hbs = require('hbs')
const genres = require('../data/allGenre')


const router = express.Router()

router.get('/', async (req, res) => {
    const api = `https://api.kinopoisk.dev/v1.4/movie?page=1&limit=60&&token=${API_TOKEN}&selectFields=poster&selectFields=ageRating&selectFields=id&selectFields=name&selectFields=genres&selectFields=countries&selectFields=year&selectFields=movieLength&selectFields=type&selectFields=rating&selectFields=shortDescription&sortField=year&sortField=rating.kp&sortType=-1&sortType=-1&status=&year=2020-2023&rating.kp=8-10`
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
    hbs.registerHelper('rating', (num) => {
        return num.toFixed(1)
    })
    hbs.registerHelper('genre', () => {
        let str = ''
        for (let i = 0; i < genres.length; i++) {
            str += `<div class="genre">${genres[i]}</div>`

        }
        return new hbs.SafeString(str)
    })

    res.render("catalog-page.hbs", requestAPI)
})


module.exports = router