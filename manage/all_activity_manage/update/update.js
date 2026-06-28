let forward=document.getElementById('forward')
let witch_part=document.getElementById('witch_part')
let witch_number=document.getElementById('witch_number')

let container=document.getElementById('container')
let container_two=document.getElementById('container_two')

let all_button=document.getElementById('all_button')

let one_button=document.getElementById('one_button')
let content_image=document.getElementById('content_image')

let submit=document.getElementById('submit')
function show_info_tour(reload) {
    reload.preventDefault()
    let data=document.getElementById('witch_part').value
    let text={'text':data}
        if(text['text']!=''){
            fetch('http://127.0.0.1:8000/manage/select_string/',{
            method:'POST',
            headers:{
                'Content-type':'application\json'
            },
            body:JSON.stringify(text)
        }).then(
            function (response) {
                return response.json()
            
            }
        ).then(
            function (select_string) {
                console.log(select_string)
                witch_number.innerHTML=''
              
                select_string['result'].forEach(num => {
                    let box=document.createElement('option')
                    box.innerText=num
                    box.style.color='black'
                    witch_number.append(box)
                  
                    
                });

                
            
            }

        )

    }

    

    
    
    
}
witch_part.addEventListener('click',show_info_tour)

function show_info_select_data(reload) {
    reload.preventDefault()
    let part=document.getElementById('witch_part').value
    let number=document.getElementById('witch_number').value
    let data={'part':part,"number":number}
    if (part!=''&number!='') {
        fetch('http://127.0.0.1:8000/manage/show_info_select_data/',{
            method:"POST",
            headers:{
                'Content-type':'application\json'
            },
            body:JSON.stringify(data)
        }).then(
            function (response) {
                return response.json()
                
            }
        ).then(
            function (show_info_select_data) {
                container.innerHTML=''
                container_two.innerHTML=''

                let box=document.createElement('div')
                box.style.display='flex'
                box.style.flexWrap='wrap'
                box.style.gap='20px'
                box.style.textAlign='center'
                box.style.width='100%'

                show_info_select_data['image'].forEach(data_image => {
                    box.innerHTML+=`<a href="../../../jango/${data_image['image']}">  نمایش فایل   ${data_image['id']}  </a>`
                    
                });
                container_two.innerHTML= `<div><input id="one" type="text" value="${show_info_select_data['name_place']}"> نام مکان </input></div>
                <div><input id="two" type="text" value="${show_info_select_data['expression']}"> توضیحات   </input></div>
                <div><input id="three" type="number" value="${show_info_select_data['price']}"> قیمت    </input></div>
                `
                container.append(box)
                all_button.style.display='block'
                content_image.style.display='block'
                
                
            }
        )
        
        
    }
    

    
}
forward.addEventListener('click',show_info_select_data)

function update_content(reload) {
    reload.preventDefault()
    let witch_part=document.getElementById('witch_part').value
    let witch_number=document.getElementById('witch_number').value
    let one=document.getElementById('one').value
    let two=document.getElementById('two').value
    let three=document.getElementById('three').value
    let choice_file=document.getElementById('choice_file').files[0]
    let number_image=document.getElementById('number_image').value
    let formatdata=new FormData()

    formatdata.append('witch_part',witch_part)
    formatdata.append('witch_number',witch_number)
    formatdata.append('one',one)
    formatdata.append('two',two)
    formatdata.append('three',three)
    formatdata.append('choice_file',choice_file)
    formatdata.append('number_image',number_image)

    fetch('http://127.0.0.1:8000/manage/update_content/',{
        method:"POST",
        body:formatdata
    })
    
    
    



    
}
submit.addEventListener('click',update_content)
