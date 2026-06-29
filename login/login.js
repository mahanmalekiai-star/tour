let submit=document.getElementById('submit')
let back=document.getElementsByClassName("back")
let error=document.getElementById('error')

let box_sms=document.getElementById('box_sms')

function sending_code() {
    let code=document.getElementById('code').value
    let name=document.getElementById('name').value
    let number=document.getElementById('number').value
    let accept=document.getElementById('accept').checked
    let age=document.getElementById('age').value
    let password=document.getElementById('password').value
    let gender=document.querySelector('input[name=gender]:checked').value
    let data={'name':name,'number':number,'age':age,'password':password,'gender':gender,'accept':accept,'code':code}
   console.log(data)
    fetch('http://127.0.0.1:8000/login/sendig_code_for_user/',{
        method:"POST",
        headers:{
            'Content-type':'application/json'
        },
        body:JSON.stringify(data)
    }).then(
        function (response) {
            return response.json()
            
        }
    ).then(
        function (sendig_code_for_user) {
            if(sendig_code_for_user['result']==true){
                error.style.color='green'
                error.textContent='ثبت نام شما با موفقیت ثبت شد '

            }
            else{
                alert('کد وارد شده نادرست است ❌')
            }
            
        }
    )
    document.getElementById('code').value=''
    // 

    
}
function clean() {
    box_sms.innerHTML=''
    
}
function login(event) {
    event.preventDefault()
    let name=document.getElementById('name').value
    let number=document.getElementById('number').value
    let accept=document.getElementById('accept').checked
    let age=document.getElementById('age').value
    let password=document.getElementById('password').value
    let gender=document.querySelector('input[name=gender]:checked').value
    let data={'name':name,'number':number,'age':age,'password':password,'gender':gender,'accept':accept}
   console.log(data)
    fetch('http://127.0.0.1:8000/login/user/',{
        method:"POST",
        headers:{
            'Content-type':'application/json'
        },
        body:JSON.stringify(data)

    }).then(
        function (response) {
            return response.json()
            
        }
    ).then(
        function (user) {
            if(user.result==false){
               error.innerHTML=`  <h3>ثبت نام به مشکل برخورد به موارد زیر توجه کنید </h3>
                <p>همه فیلد ها پر شود </p>
                <p>شماره تلفن با 0 شروع شود </p>
                <p>شماره تلفن دارای 11 رقم باشد</p>
                <p>شرایط سایت را باید قبول کنید ، سپس فرایند را انجام دهید </p>`
                error.style.color='red'
               
            }
            else if (user.result==true){
                 box_sms.innerHTML=`
                 <div class="box_close">
                <button id="close">❌</button>
                </div>
                 <div class="box_coding">
                    <input type="number" class="code" id="code" placeholder="کد ارسالی به شماره را وارد کنید ">
                </div>
                <div class="send">
                   <button id="send_code">ارسال</button>
                </div>`

                let send_code=document.getElementById('send_code')
                send_code.addEventListener('click',sending_code)

                let closee=document.getElementById('close')
                closee.addEventListener('click',clean)
                
                

            }
            else{
                alert(user.result)
            }
            
        }
    )

    

}
submit.addEventListener('click',login)