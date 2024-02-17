const express = require('express')
const { API_TOKEN } = process.env
const hbs = require('hbs')
const { genres, sort, type } = require('../data/filter-data')


const router = express.Router()

router.get('/', async (req, res) => {
 const api = `https://api.kinopoisk.dev/v1.4/movie?page=1&limit=60&&token=${API_TOKEN}&selectFields=poster&selectFields=ageRating&selectFields=id&selectFields=name&selectFields=genres&selectFields=countries&selectFields=year&selectFields=movieLength&selectFields=type&selectFields=rating&selectFields=shortDescription&sortField=year&sortField=rating.kp&sortType=-1&sortType=-1&status=&year=2020-2023`
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
            str += `<div class="genre">${genres[i].name}</div>`

        }
        return new hbs.SafeString(str)
    })
    hbs.registerHelper('sort', () => {
        let str = ''
        for (let i = 0; i < sort.length; i++) {
            str += `<div class="sort__value" >${sort[i]}</div>`

        }
        return new hbs.SafeString(str)
    })
    hbs.registerHelper('type', () => {
        let str = ''
        for (let i = 0; i < type.length; i++) {
            str += `<div class="type__value" >${type[i]}</div>`

        }
        return new hbs.SafeString(str)
    })

    res.render("catalog-page.hbs", requestAPI)



})

router.post('/api', async (req, res) => {
    const request = req.body;

    let genres = ''
    let sortType = ''
    let sort = ''
    let type = ''

    if (request.genres) {
        for (let i = 0; i < request.genres.length; i++) {
            genres += `&genres.name=${request.genres[i]}`
        }
    }
    if (request.filters) {
        for (let i = 0; i < request.filters.length; i++) {
            sortType += `&sortType=${request.sortType}`
            sort += `&sortField=${request.filters[i]}`
        }
    }
    if (request.type) {
        for (let i = 0; i < request.type.length; i++) {
            type += `&type=${request.type[i]}`
        }
    }

    const api = `https://api.kinopoisk.dev/v1.4/movie?page=1&limit=60&&token=${API_TOKEN}&selectFields=poster&selectFields=ageRating&selectFields=id&selectFields=name&selectFields=genres&selectFields=countries&selectFields=year&selectFields=movieLength&selectFields=type&selectFields=rating&selectFields=shortDescription&selectFields=description${genres}${sortType}${sort}&year=${request.year?.from}-${request.year?.to}${type}`
    let requestAPI = await fetch(api).then(api => api.json()).then(data => dat = data)

    res.status(200).send(requestAPI).json()
})
module.exports = router