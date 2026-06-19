let box_qestiosn=document.getElementById('box_qestiosn')
let answer=document.getElementById('answer')
let box_answer=document.getElementById('box_answer')

function get_questions() {
    fetch('http://127.0.0.1:8000/manage/show_sms/').then(
        function (response) {
            return response.json()
            
        }
    ).then(
        function (get_sms) {
            get_sms['result'].forEach(data_user => {
                let box=document.createElement('div')
                box.innerHTML=`
                <h4 id="sh"><h3 style="display: inline;color:green;  "> شماره پیغام :</h3>${data_user['id']}</h4> 
                
                <h4><h3 style="display: inline;color:rgb(0, 0, 0);  text-shadow: 0 0 5px white;">نام و نام خانوادگی : </h3>${data_user['name']}</h4> <h4><h3 style="display: inline;color:black;  text-shadow: 0 0 5px white;">شماره تلفن : </h3>${data_user['number']}</h4><h4 ><h3 style="display: inline;color:black;  text-shadow: 0 0 5px white;"> پیفام : </h3>${data_user['text']}</h4>`
                box.style.direction='rtl'
                box.style.fontFamily='tahoma'
                box.style.boxShadow='0 4px 10px white'
                box.style.color='white'
                box.style.padding='10px'
                box.style.borderRadius='5px'
                box.style.background='darkslategrey'
                box.style.border='1px solid white'
                box.style.width='fit-content'
                box.style.height='fit-content'

                box_qestiosn.append(box)
                
                });
                
            
            
            
        }
    )
    
}
window.onload=get_questions
function close_support() {
    box_answer.innerHTML=''  
}

function answer_to_user(){
    let id=document.getElementById('id').value
    
    let reject=document.getElementById('reject').value
    let data={'id':id,'reject':reject}
    fetch('http://127.0.0.1:8000/manage/answer_to_user/',{
        method:"POST",
        headers:{
            "Content-type":"aplications\json"
        },
        body:JSON.stringify(data)
    }).then(
        function (response) {
            return response.json()
            
        }
    ).then(
        function (answer_to_user) {
            if(answer_to_user['result']==true){
                alert("تایید شد ✅")
            }
            else{
                alert('همچین شماره پیغامی وجود ندارد ❌')
            }
            
        }

    )
    document.getElementById('id').value=''
    document.getElementById('reject').value=''
}

function for_support() {
    box_answer.innerHTML=`
        <div class="box_close">
        <button id="close">❌</button>
        </div>
        <div><input type="number" class="input" id="id" placeholder="شماره پیغام "></div>
        <div> <textarea  id="reject" rows="1" class="input" placeholder="پاسخ" ></textarea></div>
       
        
        <button id="submit">ارسال</button>
        `
    let clos=document.getElementById('close')
    clos.addEventListener('click',close_support)

    let submit=document.getElementById('submit')
    submit.addEventListener('click',answer_to_user)


    
}
answer.addEventListener('click',for_support)