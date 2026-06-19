let submit_one=document.getElementById('submit_one')
let tour=document.getElementById('tour')
let a=[]
function upload_tour(reload){
    reload.preventDefault()
    let formdata=new FormData()


    let file=document.getElementById('file').files
    for(let i in file){
       
       formdata.append('file',file[i])
    }
    let name_place=document.getElementById('name_place').value
    let expresion=document.getElementById('expresion').value
    let price=document.getElementById('price').value
    
    formdata.append('name_place',name_place)
    formdata.append('expresion',expresion)
    formdata.append('price',price)
    fetch('http://127.0.0.1:8000/manage/save_tour/',{
        method:"POST",
        body:formdata
    })
    // .then(
    //     function (response) {
    //         return response.json()
            
    //     }
    // ).then(
    //     function (save_tour) {
    //         // let id=save_tour['id']
    //         // let box_one=document.createElement('h6')
    //         // box_one.innerText="این عدد را در کادر زیر  وارد کنید "
    //         // let box_two=document.createElement('h5')
    //         // box_two.innerText=id
    //         // box_two.style.color="orange"
    //         // let box_three=document.createElement('div')
    //         // box_three.innerHTML=`<input type="number" id="conector"> <button>ثبت</button> `
    //         // tour.append(box_two,box_one,box_three)
            
            
            
            
    //     }
    // )
}
submit_one.addEventListener('click',upload_tour)