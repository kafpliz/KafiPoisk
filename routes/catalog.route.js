const express = require('express')
const { API_TOKEN } = process.env
const hbs = require('hbs')
const { genres, sort, type } = require('../data/filter-data')


const router = express.Router()

router.get('/', async (req, res) => {
    let sorting = req.query;
    let page = 1;
    let maxPage;

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

    if (Object.keys(sorting).length == 0) {

        const api = `https://api.kinopoisk.dev/v1.4/movie?page=${sorting.page ? sorting.page : page}&limit=25&&token=${API_TOKEN}&selectFields=poster&selectFields=ageRating&selectFields=id&selectFields=name&selectFields=names&selectFields=rating`
        let requestAPI = await fetch(api).then(api => api.json()).then(data => dat = data)
        maxPage = requestAPI.pages
        console.log(maxPage);
        res.render("catalog-page.hbs", requestAPI)
    } else {
        let sortType = ''; let sort = ''; let type = '';
        
        if (typeof sorting?.type == 'string' && typeof sorting?.filters == 'string') {
            sortType = `&sortType=${sorting?.sortType}`
            sort = `&sortField=${sorting?.filters}`
            type = `&type=${sorting?.type}`

        } else {

            for (let i = 0; i < sorting.filters?.length; i++) {
                sortType += `&sortType=${sorting.sortType}`
                sort += `&sortField=${sorting.filters[i]}`
            }
            for (let i = 0; i < sorting.type?.length; i++) {
                type += `&type=${sorting.type[i]}`
            }
        }


        const api = `https://api.kinopoisk.dev/v1.4/movie?page=${sorting.page? sorting.page : page}&limit=25&&token=${API_TOKEN}&selectFields=poster&selectFields=ageRating&selectFields=id&selectFields=name&selectFields=names&selectFields=rating${sortType}${sort}${type}`

        let sortingAPI = await fetch(api).then(api => api.json()).then(data => dat = data)
        maxPage = sortingAPI.pages

        res.render("catalog-page.hbs", sortingAPI)
    }

})



module.exports = router