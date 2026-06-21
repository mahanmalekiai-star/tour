let swiper=document.getElementById('swiper')
let welcom=document.getElementById("welcom")
let button_one=document.getElementById('button_one')
let support=document.getElementById('support')
let box_support=document.getElementById('box_support')
let container=document.getElementById('container')

new Swiper(swiper,{
    loop:true,
    speed:800,
    autoplay:{
        delay:2000
    }
})
function name_use() {
    fetch('http://127.0.0.1:8000/Account_user/name_user/').then(
        function (response) {
            return response.json()
            
        }
    ).then(
        function (name_user) {
            console.log(name_use)
            welcom.textContent=name_user['result'][0]
            
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
    fetch('http://127.0.0.1:8000/Account_user/name_user/').then(
        function (response) {
            return response.json()
            
        }
    ).then(
        function (name_user) {
            console.log(name_use)
           document.getElementById('onee').value=name_user['result'][1]
            
        }
    )
    
    let closee=document.getElementById('closee')
    closee.addEventListener('click',on_show)
    let ersal=document.getElementById('ersal')
    ersal.addEventListener('click',sens_sms)
    
    
}

support.addEventListener('click',show_support)



function all_tour() {
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
    
}
window.onload=all_tour