const express = require('express')
const { API_TOKEN } = process.env
const hbs = require('hbs')
const facts = require('./../utils/utils')


const router = express.Router()

router.get('/', async (req, res) => {
  const { id } = req.query;
  const api = `https://api.kinopoisk.dev/v1.4/movie?page=1&limit=1&id=${id}&token=${API_TOKEN}&selectFields=name&selectFields=status&selectFields=backdrop&selectFields=movieLength&selectFields=votes&selectFields=type&selectFields=description&selectFields=slogan&selectFields=year&selectFields=budget&selectFields=poster&selectFields=facts&selectFields=genres&selectFields=persons&selectFields=enName&selectFields=videos&selectFields=names&selectFields=similarMovies&selectFields=id&selectFields=externalId`
  let requestAPI = await fetch(api).then(api => api.json()).then(data => dat = data)

  hbs.registerHelper('genre', (genre) => {
    let page = '';
    for (let i = 0; i < genre.length; i++) {
      page += ` <li class="genres__list-item">${genre[i].name}</li>`
    }

    return new hbs.SafeString(page)
  })
  hbs.registerHelper('swiper', (fact) => {
    let page = '';
    for (let i = 0; i < fact.length; i++) {
      let factType = facts(fact[i]?.type)
      page += `<div class="swiper-slide facts-swiper" style="display: flex;"><div class="swiper-slide__item"><h1 class="number">${i + 1}</h1><span class="type">${factType}</span></div><div class="swiper-slide__item"><span>${fact[i]?.value}</span></div> </div>`
    }
    return new hbs.SafeString(page)
  })
  hbs.registerHelper('helperStatus', (status) => {
    let page = '';
    switch (status) {
      case null:
        page = 'завершён'
        break;
      case 'announced':
        page = 'анонсирован'
        break;
      case 'completed':
        page = 'завершён'
        break;
      case 'filming':
        page = 'съёмка'
        break;
      case 'post-production':
        page = 'постпродакшн '
        break;
      case 'pre-production':
        page = 'Предпроизводство'
        break;


    }
    return new hbs.SafeString(page)
  })
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
  hbs.registerHelper('persons', (persons) => {
    let person = ''
    for (let i = 0; i < persons.length; i++) {
      person += `<div class="person-card">
      <img class="person-card__img"
        src="${persons[i].photo}"
        alt="Persom photo" srcset="">
      <div class="person-card__info">
      <span class="person-card__id">${persons[i].id}</span>
        <div class="person-card__name">${persons[i].name}</div>
        <div class="person-card__profession">${persons[i].profession} </div>
      </div>
    </div>`

    }

    return new hbs.SafeString(person)
  })
  hbs.registerHelper('trailer', (video) => {
    let videos = ''

    if (video != undefined) {
      let trailer = video.trailers;
      if (trailer != 0) {
        for (let i = 0; i < trailer.length; i++) {
          videos += `<iframe class="trailer__iframe" src="${trailer[i].url}" title="${trailer[i].name}"   frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`

        }
      } else {
        videos += `Трейлер отсуствует`
      }
    }

    return new hbs.SafeString(videos)
  })
  hbs.registerHelper('nameString', (name, names) => {
    let nam = name == null ? names[0].name : name;

    return nam
  })
  hbs.registerHelper('logo', (poster) => {

    let img = ''
    if (poster.url == null && poster.previewUrl == null) {
      img = '/img/stop.jpg'
    } else {
      img = poster.url;
    }
    return img
  })
  hbs.registerHelper('similarMovie', (arr) => {
    let translate = ''
    let page = '';

    for (let i = 0; i < arr.length; i++) {

      switch (arr[i].type) {
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
      page += `<div class="swiper-slide similarMovies__slide" style="display: flex;">
      <div class="img"> <img src="${arr[i].poster.url}"  class="similarMovies__img" alt="POster img" srcset=""></div>
      <div class="info">
      <span class="similarMovie-id" style="display: none;">${arr[i].id}</span>
       <span>${arr[i].name}</span>
       <span>${translate}, ${arr[i].year} г</span>
       <span>${arr[i].rating?.kp == null ? 'неизвестно' : (arr[i].rating?.kp).toFixed(1)}</span>
      </div>
   </div>`
    }
    return new hbs.SafeString(page)
  })

  res.render("film-page.hbs", requestAPI)
})


module.exports = router