
let btn = document.querySelector('.btn')

btn.addEventListener('click', async () => { 
    let post_name = document.querySelector('.post_name').value
let post_message = document.querySelector('.post_mes').value
    let obj = {
        post_name,
        post_message,
    }
   let request = await fetch('/auth/create',{
    method: 'POST',
    headers:{
        "Content-type": "application/json",
        authorization: `Bearer ${localStorage.getItem('token')}`
    },
    body: JSON.stringify(obj)
   })

   let responce = await request.json()
   alert(responce.message)
   console.log(responce);

})