let swiper=document.getElementById('swiper')
let welcom=document.getElementById("welcom")
let button_one=document.getElementById('button_one')
let support=document.getElementById('support')
let box_support=document.getElementById('box_support')
let container=document.getElementById('container')
let container_two=document.getElementById('container_two')

let info_user_name=document.getElementById('info_user_name')
let info_user_number=document.getElementById('info_user_number')
let info_user_regestration=document.getElementById('info_user_regestration')
let info_user_rezerve=document.getElementById('info_user_rezerve')

let upload=document.getElementById('upload')

let sugestions=document.getElementById('sugestions')

new Swiper(swiper,{
    loop:true,
    speed:800,
    autoplay:{
        delay:2000
    }
})
// Authorization
function name_use() {
    fetch('http://127.0.0.1:8000/Account_user/name_user/',{
        headers:{
            'Authorization':localStorage.getItem('token')
        }
    }).then(
        function (response) {
            return response.json()
            
        }
    ).then(
        function (name_user) {
            console.log(name_use)
            info_user_name.textContent="مشخصات : "+name_user['result'][0]['name']
            info_user_number.textContent="شماره تلفن : "+name_user['result'][0]['number']
            info_user_regestration.textContent="زمان ثبت نام : "+name_user['result'][0]['regestration']
            
        }
    )
    
}
window.onload=name_use
// function page_rezerv() {
//     window.location.assign('Account_person.html')
    
// }
// button_one.addEventListener('click',page_rezerv)
function on_show() {
    box_support.innerHTML=''
}

function sens_sms() {
    let one=document.getElementById('onee').value
    let two=document.getElementById('twoo').value
    let cheeck=document.getElementById('cheeck').checked
    let data={'phone':one,'text':two,'check':cheeck}
    fetch('http://127.0.0.1:8000/Account_user/get_sms/',{
        method:'POST',
        headers:{
            'Content-type':'appliactions\json'
        },
        body:JSON.stringify(data)
    }).then(
        function (response) {
            return response.json()
            
        }
    ).then(
        function (get_sms) {
            if(get_sms['result']==true){
                alert('پیغام ارسال شد ✅')
            }
            else{
                alert("در صورت قبول نداشتن شماره نمی توان پیغام ارسال کرد ❌")
            }
            
        }
    )
    document.getElementById('twoo').value=''
    
}
function show_support() {
   
    box_support.innerHTML=`<div class="box_close">
            <button class="close" id="closee">❌</button>
        </div>
        <textarea type="number" rows="1"  class="one" id="onee" disabled=true></textarea>
        <textarea type="text" rows="1" placeholder="سوالات خود را بنویسید " class="two" id="twoo"></textarea>
        <div>
         <label class="check" >
            <input type="checkbox" class="cheeck" id="cheeck"> ایا این شماره تلفن را تایید می کنید
         </label>
        </div>

        <div>
            <button class="ersal" id='ersal'>ارسال</button>
        </div>`
    fetch('http://127.0.0.1:8000/Account_user/name_user/',{
        headers:{
            'Authorization':localStorage.getItem('token')
        }
    }).then(
        function (response) {
            return response.json()
            
        }
    ).then(
        function (name_user) {
            console.log(name_use)
           document.getElementById('onee').value=name_user['result'][0]['number']
            
        }
    )
    
    let closee=document.getElementById('closee')
    closee.addEventListener('click',on_show)
    let ersal=document.getElementById('ersal')
    ersal.addEventListener('click',sens_sms)
    
    
}

support.addEventListener('click',show_support)




fetch('http://127.0.0.1:8000/Account_user/show_all_tourist/').then(
    function (response) {
        return response.json()
            
    }
).then(
    function (show_all_tourist) {
        console.log(show_all_tourist)
        container.innerHTML=''
        show_all_tourist['result'].forEach(data => {
            let box=document.createElement('div')
            box.style.display='flex'
            box.style.boxShadow='0 0 5px blue'
            box.style.width='fit-content'
            box.style.flexWrap='wrap'
            box.style.width="100%"
                
            data['image'].forEach(im => {
                box.innerHTML+=`<div class="image_tourist" ><img src="../jango/${im}" alt="" class="img"></div>`
            });
            box.innerHTML+=`<div class="info"><h3>📍 نام مکان : <h4 style="display: inline;">${data['name_place']}</h4></h3> <hr>  <h3> ⏳ توضیحات : <h4 style="display: inline;">${data['expresion']}</h4></h3> <hr> <h3> 💵 قیمت  : <h4 style="display: inline;">${data['price']} <h5 class="money">تومان <\h5> </h4></h3>   <hr>   <button class="rezev">رزرو تور </button> <hr> <p>${data["id"]}<\p>     </div> `
            container.append(box)
            
        });
           
            
    }
)
    




fetch('http://127.0.0.1:8000/Account_user/show_tour_dongi/').then(
    function (response) {
        return response.json()
            
    }
).then(
    function (show_tour_dongi) {
        console.log(show_tour_dongi)
        container_two.innerHTML=''
        show_tour_dongi['result'].forEach(data => {
            let boox=document.createElement('div')
            boox.style.display='flex'
            boox.style.boxShadow='0 0 5px blue'
            boox.style.width='fit-content'
            boox.style.flexWrap='wrap'
            boox.style.width="100%"
                
            data['image'].forEach(im => {
                boox.innerHTML+=`<div class="image_tourist" ><img src="../jango/${im}" alt="" class="img"></div>`
            });
            boox.innerHTML+=`<div class="info"><h3>📍 نام مکان : <h4 style="display: inline;">${data['name_place']}</h4></h3> <hr>  <h3> ⏳ توضیحات : <h4 style="display: inline;">${data['expresion']}</h4></h3> <hr> <h3> 💵 قیمت  : <h4 style="display: inline;">${data['price']} <h5 class="money">تومان <\h5> </h4></h3>   <hr>   <button class="rezev"> رزرو تور دونگی</button> <hr> <p>${data["id"]}<\p>     </div> `
            container_two.append(boox)
            
        });
           
            
    }
)

function upload_suggestion(){
    let text=document.getElementById('text').value
    let upload_img=document.getElementById('upload_img').files 
    let box_message=document.getElementById('box_message')
    let formdata=new FormData()
    formdata.append('text',text)
    for(let i in upload_img){
        formdata.append('files',upload_img[i])
    }
    fetch('http://127.0.0.1:8000/Account_user/suggestion/',{
        method:'POST',
        headers:{
            'Authorization':localStorage.getItem('token')
        },
        body:formdata
    }).then(
        function (response) {
            return response.json()
            
        }
    ).then(
        function (suggestion) {
            let box=document.createElement('div')
            box_message.innerHTML=''
            if (suggestion['result']==true) {
                
                box.innerHTML=`<h4>نظر سنجی با موفقیت تکمیل شد ✅</h4>`
                
                
                
            }
            else if (suggestion['result']==false){
                box=document.createElement('div')
                box.innerHTML=`<h4>ثبت نظر با مشکل برخورد کرد ❌</h4> <h5>توجه داشاه باشد نباید بیش از 2 فایل باشد و پسوند مناسب </h5>`
            }
            // box.style.textAlign="center"
            // box.style.width='100%'
            box_message.append(box)
            
            
            
        }
    )
    document.getElementById('text').value=''

}
upload.addEventListener('click',upload_suggestion)
    