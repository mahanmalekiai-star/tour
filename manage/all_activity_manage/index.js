let users=document.getElementById('users')
let question=document.getElementById('question')
let number=document.getElementById('number')
let new_message=document.getElementById('new_message')
let container_new_message=document.getElementById('container_new_message')
let create_tour=document.getElementById('create_tour')
let deleete=document.getElementById('delete')
let update=document.getElementById('update')


function all_message() {
    fetch('http://127.0.0.1:8000/manage/show_number_message').then(
        function (response) {
            return response.json()
            
        }
    ).then(
        function (show_number_message) {
            if(show_number_message['result']>0){
                
                question.style.color='black'
                number.textContent=show_number_message['result']

            }
            
        }
    )
    
}
window.onload=all_message
function user() {
    window.location.assign('users/users.html')
    
}
users.addEventListener('click',user)
function all_question() {
    window.location.assign('qestiosn/qestiosn.html')
    
}
question.addEventListener('click',all_question)
function clean() {
    container_new_message.innerHTML=''
    
}

function sms_for_user(){
    let text=document.getElementById('id').value
    let data={'data':text} 
    fetch('http://127.0.0.1:8000/manage/send_sms/',{
        method:"POST",
        headers:{
            'Content-type':'application\json'
        },
        body:JSON.stringify(data)
    })
    document.getElementById('id').value=''


}

function box_new_message() {
    container_new_message.innerHTML=`
        <div class="box_close">
        <button id="close">❌</button>
        </div >
        <div class="id"><textarea rows="1" class="input" id="id" placeholder="پیغام "></textarea></div>
        <div class="submit">
        <button id="submit">ارسال</button>
        </div>
    `
    let closee=document.getElementById('close')
    closee.addEventListener('click',clean)

    let submit=document.getElementById('submit')
    submit.addEventListener('click',sms_for_user)
    
}
new_message.addEventListener('click',box_new_message)

function tour() {
    window.location.assign('create_tour/create_tour.html')
    
}
create_tour.addEventListener('click',tour)


function delete_content() {
 
    let which_content=document.getElementById('which_content').value
    let number_contentt=document.getElementById('number_contentt').value
    let data={'which_content':which_content,'number_contentt':number_contentt}
    console.log(data)
    fetch('http://127.0.0.1:8000/manage/delet_countent/',{
        method:"POST",
        headers:{
            'Content-type':'application\json'
        },
        body:JSON.stringify(data)
    })
    document.getElementById('id').value=''
    document.getElementById('content').value=''
   
    
}
function number_content() {
    let value_content=document.getElementById('which_content').value
    let number_contentt=document.getElementById('number_contentt')
    if (value_content!='') {
        let data={'witch':value_content}
        fetch('http://127.0.0.1:8000/manage/select_whitch_content/',{
        method:'POST',
        headers:{
            'Content-type':'application\json'
        },
        body:JSON.stringify(data)
        }).then(
            function (response) {
                return response.json()
                
            }
        ).then(
            function (select_whitch_content) {
                number_contentt.innerHTML=''
                select_whitch_content['result'].forEach(num => {
                    number_contentt.innerHTML+=`<Option value="${num}">${num}</Option>`
                    
                });
                
                
                
            }
        )
        
    }
    
   
    
}

function delete_message() {
    
    container_new_message.innerHTML=`
        <div class="box_close">
        <button id="close">❌</button>
        </div >
        <div class="id">
        <select name="" id="which_content">
        <option value="" disabled  selected>انتخاب کنید  </option>
        <option value="tour">تور </option>
        <option value="dongi">تور دونگی </option>
        </select>
        </div>
        <div class="id">
        <select name="" id="number_contentt">
        </select>
        </div>
        <div class="submit">
        <button id="submit"> حذف </button>
        </div>
    `
    container_new_message.style.border='1px solid pink'
    let which_content=document.getElementById('which_content')
    which_content.addEventListener('click',number_content)
    
    let closee=document.getElementById('close')
    closee.addEventListener('click',clean)

    let submit=document.getElementById('submit')
    submit.addEventListener('click',delete_content)
    
}
deleete.addEventListener('click',delete_message)

function page_update() {
    window.location.assign('update/update.html')
    
}
update.addEventListener('click',page_update)