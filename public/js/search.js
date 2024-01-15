let input = document.querySelector('.search')
let btn = document.querySelector('.btn')



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

btn.addEventListener('click', async () => {
    let fromCLient = {
        param: input.value
    }
    const responce = await fetch('/search/api', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(fromCLient)
    })
    const render = await responce.json()
    if (render) {
        
        document.querySelector('.card-catalog').innerHTML = ''
        
        let data = render.docs
        for (let i = 0; i < data.length; i++) {

            document.querySelector('.card-catalog').innerHTML += `<div class="card"  oneclick=""openFilmPage()>
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
        <div class="briefly-info__item"><span class="briefly-info__text">${data[i].movieLength != null ? data[i].movieLength + ' м.' : '-'}</span></div>
        <div class="briefly-info__item"><span class="briefly-info__text">${translater(data[i].type)}</span></div>
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
        openFilmPage()
    }
})

