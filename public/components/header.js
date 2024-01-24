let search = document.querySelector('.header__item-div')
let login = document.querySelector('.header__item-btn')

let cabinet = document.querySelector('.mini_cabinet')
let cabinetAvatar = document.querySelector('.cabinet__avatar')
let button = document.querySelector('.button')


!localStorage.getItem('token') ?  notData() : getData()

async function notData() {
    cabinetAvatar.src = `/img/user.png`
    document.querySelector('.header__modal-login').classList.toggle('none')
    document.querySelector('.header__modal-z').classList.toggle('none')
}

async function getData() {
    let username = document.querySelector('.header__modal-name')
    let roles = document.querySelector('.header__modal-span')
    let request = await fetch('/auth/getuser', {
        method: 'POST',
        headers: {
            authorization: `Bearer ${localStorage.getItem('token')}`
        },
    })

    let responce = await request.json()
    if (responce) {
       cabinetAvatar.src = responce.avatar
       username.innerText = responce.username
       roles.innerText = responce.roles.map(item => item)
        
    }
}

let btnLeave = document.querySelector('.header__modal-leave')
let toCabinet = document.querySelector('.header__modal-cabinet')
let toLogin = document.querySelector('.header__modal-login')

cabinet.addEventListener('click', () => {
    document.querySelector('.header__modal').classList.toggle('modal')
})


    btnLeave.addEventListener('click', () => {
        localStorage.clear()
        location.reload()
    })
    toCabinet.addEventListener('click', () => {
        location = '/profile'
    })   

    toLogin.addEventListener('click', () => {
        location = '/login'
    })


 
  


