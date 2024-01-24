

let pagination = () => {
    let page = document.querySelectorAll('.page')


    for (let i = 0; i < page.length; i++) {
        page[i].addEventListener('click', () => {
            location = `?page=${page[i].innerText}`
        })

    }
}
pagination()


function rederect(prop) {
    switch (prop) {
        case 'top50':
            location = '/top'
            break;
        case 'main':
            location = 'http://localhost:3000/'
            break;

    }
}
let swiper = new Swiper(".mySwiper", {
    pagination: {
      el: ".swiper-pagination",
      type: "fraction",
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });

let openFilmPageMain = () => {
    let filmCard = document.querySelectorAll('.undeslide')

    for (let i = 0; i < filmCard.length; i++) {
        filmCard[i].addEventListener('click', async () => {
            console.log(200);
            let id = await filmCard[i].querySelector('.undeslide__id').innerText;
            location = `/film?id=${id}`

        })

    }

}
openFilmPageMain()

