let spanFrom = document.querySelector('.rangeYear__container-span-from')
let rangeFrom = document.querySelector('.rangeYear__container-input-from')
let spanTo = document.querySelector('.rangeYear__container-span-to')
let rangeTo = document.querySelector('.rangeYear__container-input-to')


let genre = document.querySelectorAll('.genre')
let filter = document.querySelectorAll('.sort__value')
let type = document.querySelectorAll('.type__value')
let radio = document.querySelectorAll('.form-check-input')

let sendButton = document.querySelector('.send__button')

let genres = []
let filters = []
let types = []

/* 
for (let i = 0; i < genre.length; i++) {
    genre[i].addEventListener('click', () => {
        genre[i].classList.toggle('genre__active')
        if (genres.includes(genre[i].innerText)) {
            let index = genres.indexOf(genre[i].innerText);
            genres.splice(index, 1)
        } else {
            genres.push(genre[i].innerText)
        }

    })

} */

for (let i = 0; i < filter.length; i++) {
    filter[i].addEventListener('click', () => {
        filter[i].classList.toggle('genre__active')
        if (filters.includes(filter[i].innerText)) {
            let index = filters.indexOf(filter[i].innerText);
            filters.splice(index, 1)
        } else {
            filters.push(filter[i].innerText)
        }

    })

}
for (let i = 0; i < type.length; i++) {
    type[i].addEventListener('click', () => {
        type[i].classList.toggle('genre__active')
        if (types.includes(type[i].innerText)) {
            let index = types.indexOf(type[i].innerText);
            types.splice(index, 1)
        } else {
            types.push(type[i].innerText)
        }

    })

}

function translater(str) {
    let translate = '';
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
    return translate
}
let str = ''

sendButton.addEventListener('click', async () => {
    let sort = ''
    let typeList = ''
    for (let i = 0; i < filters.length; i++) {
        switch (filters[i]) {
            case 'рейтингу':
                sort +='&filters=rating.kp'
                break;
            case 'возрастному ограничению':
                sort +='&filters=ageRating'
                break;
            case 'году':
                sort +='&filters=year'
                break;
            case 'названию':
                sort +='&filters=name'
                break;
            case 'id':
                sort +='&filters=id'
                break;
        }

    }
    for (let i = 0; i < types.length; i++) {
        switch (types[i]) {
            case 'мультсериал':
                typeList += '&type=animated-series'
                break;
            case 'аниме':
                typeList += '&type=anime'
                break;
            case 'мультфильм':
                typeList += '&type=cartoon'
                break;
            case 'фильм':
                typeList += '&type=movie'
                break;
            case 'сериал':
                typeList += '&type=tv-series'
                break;
        }

    }


    location +=`?sortType=${radio[0].checked ? 1 : -1}${typeList}${sort}&page=1`
    str +=`&sortType=${radio[0].checked ? 1 : -1}${typeList}${sort}&page=1`
   
})

let foot = document.querySelector('.footer')
let page = new URL(document.location).searchParams.get('page') ?new URL(document.location).searchParams.get('page') : 1 ;



let prev = `<a href="?page=${page > 1 ? page - 10 : ''}" class="footer__item footer__item-prev"><ion-icon class="footer__item-img" name="arrow-back"></ion-icon></a>`
let next = `<a href="?page=${page==1 ? page*10+1 : Number(page) + 10}" class="footer__item footer__item-next"><ion-icon class="footer__item-img" name="arrow-forward"></ion-icon></a>`

let pages = ''
for (let i = 1; i <=  10; i++) {
    pages += `<a href="?page=${page != 1 ? (Number(page) - 1) + i : i}" class="footer__item">${page != 1 ? (Number(page) - 1) + i : i}</a>`
}


foot.innerHTML = prev + pages + next