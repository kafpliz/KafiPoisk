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
let radio = document.querySelectorAll('.form-check-input')

let sendButton = document.querySelector('.send__button')

let genres = []
let filters = []


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


sendButton.addEventListener('click', async () => {
    let sort = []
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

    let fromCLient = await {
        sortType: radio[0].checked ? 1 : -1,
        genres: genres,
        filters: sort,
        year: {
            from: document.querySelector('.rangeYear__container-span-from').innerText,
            to: document.querySelector('.rangeYear__container-span-to').innerText,
        }
    }
    console.log(fromCLient);
    const responce = fetch('/catalog/api', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: await JSON.stringify(fromCLient)
    })
})