let dataForServer = async () => {
    let data = {
        name: document.querySelector(".input_name").value,
        email: document.querySelector(".input_email").value,
        password: document.querySelector(".input_password").value,
    }

    const post = await fetch('/login', {
        method: "POST",
        headers: {
            "Content-type": 'application/json'
        },
        body: JSON.stringify(data)
    })
}

let pagination = () => {
    let page = document.querySelectorAll('.page')


    for (let i = 0; i < page.length; i++) {
        page[i].addEventListener('click', () => {
            location = `?page=${page[i].innerText}`
        })

    }
}


openFilmPage()

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