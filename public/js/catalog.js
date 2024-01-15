let spanFrom = document.querySelector('.rangeYear__container-span-from')
let rangeFrom = document.querySelector('.rangeYear__container-input-from')
let spanTo = document.querySelector('.rangeYear__container-span-to')
let rangeTo = document.querySelector('.rangeYear__container-input-to')


rangeFrom.addEventListener('mouseup', () => {
    let year = ((rangeFrom.value / 100) * 100).toFixed(0)

    return spanFrom.innerText = year > 9 ? '20' + year : '200' + year

})
rangeTo.addEventListener('mouseup', () => {
    let year = ((rangeTo.value / 100) * 100).toFixed(0)

    return spanTo.innerText = year > 9 ? ' 20' + year : '200' + year

})

let genre = document.querySelectorAll('.genre')
let filter = document.querySelectorAll('.sort__value')
let type = document.querySelectorAll('.type__value')
let radio = document.querySelectorAll('.form-check-input')

let sendButton = document.querySelector('.send__button')

let genres = []
let filters = []
let types = []


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

}
for (let i = 0; i < filter.length; i++) {
    filter[i].addEventListener('click', () => {
        filter[i].classList.toggle('genre__active')
        if (filters.includes(filter[i].innerText)) {
            let index = filters.indexOf(filter[i].innerText);
            filters.splice(index, 1)
        } else {
            filters.push(filter[i].innerText)
        }
        console.log(filters);
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


sendButton.addEventListener('click', async () => {
    let sort = []
    let typeList = []
    for (let i = 0; i < filters.length; i++) {
        switch (filters[i]) {
            case 'рейтингу':
                sort.push('rating.kp')
                break;
            case 'возрастному ограничению':
                sort.push('ageRating')
                break;
            case 'году':
                sort.push('year')
                break;
            case 'названию':
                sort.push('name')
                break;
            case 'id':
                sort.push('id')
                break;
        }

    }
    for (let i = 0; i < types.length; i++) {
        switch (types[i]) {
            case 'мультсериал':
                typeList.push('animated-series')
                break;
            case 'аниме':
                typeList.push('anime')
                break;
            case 'мультфильм':
                typeList.push('cartoon')
                break;
            case 'фильм':
                typeList.push('movie')
                break;
            case 'сериал':
                typeList.push('tv-series')
                break;
        }

    }

    let fromCLient = {
        sortType: radio[0].checked ? 1 : -1,
        genres: genres,
        filters: sort,
        type: typeList,
        year: {
            from: document.querySelector('.rangeYear__container-span-from').innerText,
            to: document.querySelector('.rangeYear__container-span-to').innerText,
        }
    }
    console.log(fromCLient);
    const responce = await fetch('/catalog/api', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(fromCLient)
    })
    let catalog = document.querySelector('.card-catalog')
    catalog.innerHTML= ' '
    const filter = await responce.json()
    if(!filter){
        catalog.innerHTML = 'Ничего не найдено'
    }
    console.log(filter);
  
    let data = filter.docs
    for (let i = 0; i < data.length; i++) {
        openFilmPage()
        
        catalog.innerHTML += `<div class="card">
<div class="card__poster"><img class="card__poster-img" src="${data[i].poster.url}" alt="Film poster" srcset="">
    <div class="card__poster-kpid">ID: <span class="card__span-id">${data[i].id}</span></div>
</div>
<div class="age-rating">
    <span>${data[i].ageRating != null ? data[i].ageRating : '0'}+</span>
</div>
<div class="card__main">
    <div class="card__film-name">
        <div class="card__name-item"><span class="card__text-name">${data[i].name}</span></div>
    </div>
    <div class="briefly-info">
        <div class="briefly-info__item"><span class="briefly-info__text">${data[i].genres[0].name}</span></div>
        <div class="briefly-info__item"><span class="briefly-info__text">${data[i].countries[0].name}</span></div>
        <div class="briefly-info__item"><span class="briefly-info__text">${data[i].year}г</span></div>
        <div class="briefly-info__item"><span class="briefly-info__text">${data[i].movieLength != null?data[i].movieLength+ ' м.' : '-' }</span></div>
        <div class="briefly-info__item"><span class="briefly-info__text">${ translater(data[i].type)}</span></div>
    </div>
    <div class="reviews">
        <div class="reviews__item">
            <div class="reviews__item_green"><span class="reviews__text">KP: ${(data[i].rating.kp).toFixed(1)} </span></div>
        </div>
        <div class="reviews__item">
            <div class="reviews__item_green"><span class="reviews__text">imdb: ${(data[i].rating.imdb).toFixed(1)}</span></div>
        </div>
    </div>
    <div class="short-description">
        <span class="short-text">${data[i].shortDescription != null ? data[i].shortDescription : data[i].description}</span>
    </div>
</div>
</div>
        `
    }
   
})