let search = document.querySelector('.search')
let login = document.querySelector('.header__item-btn')

let cabinet = document.querySelector('.mini_cabinet')
let cabinetAvatar = document.querySelector('.cabinet__avatar')
let button = document.querySelector('.button')

function cookie() {
    return document.cookie.split('; ').reduce((acc, item) => {
      const [name, value] = item.split('=')
      acc[name] = value
      return acc
    }, {})
  }


!document.cookie.length  ?  notData() : getData()



async function notData() {
    cabinetAvatar.src = `/img/user.png`
    document.querySelector('.header__modal-login').classList.toggle('none')
    document.querySelector('.header__modal-z').classList.toggle('none')
}

async function getData() {
  
    let username = document.querySelector('.header__modal-name')
    let roles = document.querySelector('.header__modal-span')
    let request = await fetch('/auth/shortUserInfo', {
        method: 'POST',
        headers: {
            authorization: `Bearer ${cookie().authToken}`
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


    toLogin.addEventListener('click', () => {
        location = '/login'
    })


 search.addEventListener('click', ()=> {
    location='/search'
 })
  


