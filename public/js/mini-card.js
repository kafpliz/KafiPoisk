let openFilmPage = () => {
    let filmCard = document.querySelectorAll('.card')

    for (let i = 0; i < filmCard.length; i++) {
        filmCard[i].addEventListener('click', async () => {
            console.log(200);
            let id = await filmCard[i].querySelector('.card__span-id').innerText;
            location = `/film?id=${id}`

        })

    }

}
openFilmPage()

