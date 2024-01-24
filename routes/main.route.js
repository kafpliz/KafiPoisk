const express = require('express')
const { API_TOKEN } = process.env
const hbs = require('hbs')


const router = express.Router()

router.get('/', async (req, res) => {
 /*   
 const request_r1 = `https://api.kinopoisk.dev/v1.4/movie?page=1&limit=9&&token=${API_TOKEN}&selectFields=poster&selectFields=id&selectFields=name&selectFields=genres&selectFields=year&selectFields=movieLength&selectFields=type&selectFields=rating&selectFields=shortDescription&selectFields=description&selectFields=backdrop&sortField=year&sortField=rating.kp&sortType=-1&sortType=-1&status=&year=2022-2023&rating.kp=8-10&type=movie`
    const request_r2 = `https://api.kinopoisk.dev/v1.4/movie?page=1&limit=9&&token=${API_TOKEN}&selectFields=poster&selectFields=id&selectFields=name&selectFields=genres&selectFields=year&selectFields=movieLength&selectFields=type&selectFields=rating&selectFields=shortDescription&selectFields=description&selectFields=backdrop&sortField=year&sortField=rating.kp&sortType=-1&sortType=-1&status=&year=2022-2023&rating.kp=8-10&type=animated-series`
    const request_r3 = `https://api.kinopoisk.dev/v1.4/movie?page=1&limit=9&&token=${API_TOKEN}&selectFields=poster&selectFields=id&selectFields=name&selectFields=genres&selectFields=year&selectFields=movieLength&selectFields=type&selectFields=rating&selectFields=shortDescription&selectFields=description&selectFields=backdrop&sortField=year&sortField=rating.kp&sortType=-1&sortType=-1&status=&year=2022-2023&rating.kp=8-10&type=anime`
    const request_r4 = `https://api.kinopoisk.dev/v1.4/movie?page=1&limit=9&&token=${API_TOKEN}&selectFields=poster&selectFields=id&selectFields=name&selectFields=genres&selectFields=year&selectFields=movieLength&selectFields=type&selectFields=rating&selectFields=shortDescription&selectFields=description&selectFields=backdrop&sortField=year&sortField=rating.kp&sortType=-1&sortType=-1&status=&year=2022-2023&rating.kp=8-10&type=cartoon`
    const request_r5 = `https://api.kinopoisk.dev/v1.4/movie?page=1&limit=9&&token=${API_TOKEN}&selectFields=poster&selectFields=id&selectFields=name&selectFields=genres&selectFields=year&selectFields=movieLength&selectFields=type&selectFields=rating&selectFields=shortDescription&selectFields=description&selectFields=backdrop&sortField=year&sortField=rating.kp&sortType=-1&sortType=-1&status=&year=2022-2023&rating.kp=8-10&type=tv-series`
    let r1 = await fetch(request_r1).then(api => api.json()).then(data => dat = data)
    let r2 = await fetch(request_r2).then(api => api.json()).then(data => dat = data)
    let r3 = await fetch(request_r3).then(api => api.json()).then(data => dat = data)
    let r4 = await fetch(request_r4).then(api => api.json()).then(data => dat = data)
    let r5 = await fetch(request_r5).then(api => api.json()).then(data => dat = data)
    let requestAPI = {
        r1,
        r2,
        r3,
        r4,
        r5,
    } */

    hbs.registerHelper('list2023', (arr)=> {
        
        let str = ''
        for (let i = 0; i < arr.length; i++) {
           str += ` <div class="swiper-slide" style="background: ${arr[i].backdrop.url != null ?  `url(${arr[i].backdrop.url}) no-repeat top 0 left 0 /cover;` : '' }">
           <div class="undeslide">
           <span class="undeslide__id">${arr[i].id}</span>
               <div class="undeslide_poster"><img src="${arr[i].poster.url}" class="undeslide_img" alt="" srcset=""></div>
               <div class="undeslide__info">
                   <div class="name__div">${arr[i].name}</div>
                   <div class="short-info__div"><span class="rating__span">${(arr[i].rating.kp).toFixed(1)} <img src="img/star.svg" alt="" srcset=""></span> <span>${arr[i].movieLength != null ? arr[i].movieLength + '  мин.':'-' }</span> <span>${arr[i].year}г.</span></div>
                   <div class="genre__div">${arr[i].genres[0].name  }</div>
                   <div class="description__div">${arr[i].shortDescription == null ? "Не указано" : arr[i].shortDescription}</div>
               </div>
           </div>
   </div>`    
        }
        return new hbs.SafeString(str)
    })


    
    res.render("main.hbs",/* requestAPI */)
})


module.exports = router