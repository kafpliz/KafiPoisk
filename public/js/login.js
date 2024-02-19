let log = document.querySelector('.login')
let reg = document.querySelector('.registr')
let a = document.querySelector('.a')



log.addEventListener('click', async () => {
    let form = document.querySelector('.log')
    let obj = {
        username: form.querySelector('.username').value,
        password: form.querySelector('.password').value
    }

    let responce = await fetch('auth/login', {
        method: 'POST',
        headers: { "Content-Type": "application/json", },
        body: JSON.stringify(obj),

    })
    if (responce) {
        let forClient = await responce.json()

        if (forClient.status == 200) {
            alert(`${forClient.message}. ${forClient.errors ? forClient.errors.errors[0].msg : ''}`)
            document.cookie = `authToken=${forClient.token}; `;
            localStorage.setItem('token', forClient.token)
            location = '/'
        } else {
            alert(`${forClient.message}. ${forClient.errors ? forClient.errors.errors[0].msg : ''}`)
        }

        console.log(forClient);
    } else {
        alert('Не удалось войти')
    }
})

reg.addEventListener('click', async () => {
    let form = document.querySelector('.reg')
    let obj = {
        username: form.querySelector('.username').value,
        password: form.querySelector('.password').value,
    }

    let responce = await fetch('auth/registr', {
        method: 'POST',
        headers: { "Content-Type": "application/json", },
        body: JSON.stringify(obj),
    })
    if (responce) {

        let forClient = await responce.json()
        alert(`${forClient.message}. ${forClient.errors ? forClient.errors.errors[0].msg : ''}`)

    }


})


/* 
a.addEventListener('click', async () => {
    
 let responce = await fetch('/auth/cabinet', {
        method: 'GET',
        headers: { 
        authorization: `Bearer ${localStorage.getItem('token')}`
     },
})
    let request = await responce.json()
    alert(request.message)
    console.log(request);

}) */