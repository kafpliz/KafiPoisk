const express = require('express')
const { API_TOKEN } = process.env
const hbs = require('hbs')



const router = express.Router()

router.get('/', async (req, res) => {
  const { id } = req.query;
  const api = `https://api.kinopoisk.dev/v1.4/person/${id}?token=${API_TOKEN}`
  let requestAPI = await fetch(api).then(api => api.json()).then(data => dat = data)

  hbs.registerHelper('countAward', (countAwards) => {

    switch (countAwards) {
      case null:
        return 'не имеет наград'

      case countAwards === 1:
        return 'имеет 1 награду'

      case countAwards > 1 && countAwards <= 4:
        return `имеет ${countAwards} награды`

      case countAwards >= 5:
        return `имеет ${countAwards} наград`
    }


  })
  hbs.registerHelper('proffesions', (arr) => {
    let res = '';
    for (let i = 0; i < arr.length; i++) {
      if (arr.length > 1) {

        res += `<li class="catalog-profession__li">${arr[i].value}</li>`
        res += `<span class="catalog-profession__symbol">·</span>`
      } else {
        res += `<li class="catalog-profession__li">${arr[i].value}</li>`
      }
    }

    return new hbs.SafeString(res)
  })
  hbs.registerHelper('fact', (arr) => {
    let res = '';
    if (arr.length != 0) {
      for (let i = 0; i < arr.length; i++) {
        res += `<div class="swiper-slide">${arr[i].value}</div>`
      }
    } else {
      res += `<div class="swiper-slide">Что вы ничего не знаете...</div>`
    }

    return new hbs.SafeString(res)
  })
  hbs.registerHelper('film', (arr) => {
    let res = '';
    let proffesion = ''
   
    if (arr.length != 0) {
      for (let i = 0; i < arr.length; i++) {
        switch (arr[i].enProfession) {
          case 'editor':
            proffesion = 'издатель'
          break;
          case 'writer':
            proffesion = 'сценарист '
          break;
          case 'director':
            proffesion = 'директор'
          break;
          case 'actor':
            proffesion = 'актёр'
          break;
          case 'producer':
            proffesion = 'продюсер'
          break;
          case 'cameo':
            proffesion = 'эпизодическая роль'
          break;
          case 'uncredited':
            proffesion = 'в титрах не указан'
          break;

        }
        res += ` <div class="swiper-slide">
        <span class="swiper-slide__num">${i+1}</span>
        <span>${arr[i].name == null ? arr[i].alternativeName : arr[i].name}</span>
        <span>${proffesion}</span>
        <span class="swiper-slide__rating-span">${arr[i].rating == null ? 'Рейтинг неизвестен' : arr[i].rating.toFixed(1)+ '<img class="swiper-slide__star" src="img/star.svg"/>'} </span>
        <a href="/film?id=${arr[i].id}">Посмотреть</a>
    </div>`
      }
    } else {
      res += `<div class="swiper-slide"><span>В караганде</span></div>`
    }

    return new hbs.SafeString(res)
  })

  hbs.registerHelper('birth', (arr) => {
    let date = `${arr[0].value}, ${arr[arr.length - 1].value}`
   return date
 
  })

  res.render("person-page.hbs", requestAPI)
})


module.exports = router