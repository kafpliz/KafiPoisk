const swiper = new Swiper(".mySwiper", {
  slidesPerView: 1,
  spaceBetween: 30,
  loop: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});
const similarMovies = new Swiper(".similarMovies", {
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

let personCard = document.querySelectorAll('.person-card')
for (let i = 0; i < personCard.length; i++) {
  personCard[i].addEventListener('click', () => {
    location = `/person?id=${personCard[i].querySelector(".person-card__id").innerText}`
  })

}

let similarMovies__card = document.querySelectorAll('.similarMovies__slide')
for (let i = 0; i < similarMovies__card.length; i++) {
similarMovies__card[i].addEventListener('click', ()=> {
  location = `/film?id=${similarMovies__card[i].querySelector('.similarMovie-id').innerText}`
})
  
}