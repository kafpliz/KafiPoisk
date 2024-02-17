let a = document.querySelectorAll('.bookmark')
let arr = [{bookmark: 'Читаю',val: 2}]
console.log(arr);
console.log('----------------------');

for (let i = 0; i < a.length; i++) {
 a[i].addEventListener('click', ()=> {
    let obj = {
        bookmark : `${a[i].name}`,
        val: 1
    }
    console.log(obj);
    sort(obj)

 })
    
}

function sort(obj){

    if(arr.length == 0){arr.push(obj); console.log('риж');}


for (let i = 0; i < arr.length; i++) {
    if(obj.bookmark == arr[i].bookmark){
        arr.splice(1, i)
    
    }
    if(obj.bookmark != arr[i].bookmark){
        arr.push(obj)
        console.log('похожих нету');
    }
    
}
console.log(arr);

}