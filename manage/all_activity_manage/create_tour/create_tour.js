let submit_one=document.getElementById('submit_one')
let tour=document.getElementById('tour')
let submit_two=document.getElementById('submit_two')
let a=[]
function upload_tour(reload){
    reload.preventDefault()
    let formdata=new FormData()


    let file=document.getElementById('file').files
    for(let i in file){
       
       formdata.append('file',file[i])
    }
    console.log(formdata)
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
}
submit_one.addEventListener('click',upload_tour)
function upload_tour_dongi(reload) {
    reload.preventDefault()
    let formdata=new FormData()
    let file=document.getElementById('file_two').files
    for(let i in file){
        console.log(i)
        formdata.append('file',file[i])
        
    }
    console.log(formdata)
    let name_place_two=document.getElementById('name_place_two').value
    let expresion_two=document.getElementById('expresion_two').value
    let price_two=document.getElementById('price_two').value
    formdata.append('name_place_two',name_place_two)
    formdata.append('expresion_two',expresion_two)
    formdata.append('price_two',price_two)
    console.log(formdata)

    
    fetch('http://127.0.0.1:8000/manage/save_tour_dongi/',{
        method:"POST",
        body:formdata
    })

    
}
submit_two.addEventListener('click',upload_tour_dongi)