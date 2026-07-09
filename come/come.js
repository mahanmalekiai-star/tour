let submit=document.getElementById('submit')
let error=document.getElementById('error')
let click_forggot_pasword=document.getElementById('click_forggot_pasword')
let box_fogget_password=document.getElementById('box_fogget_password')
function com(event) {
    event.preventDefault()
    let password=document.getElementById('password').value
    let name=document.getElementById('name').value
    let data={'name':name,'password':password}
    fetch('http://127.0.0.1:8000/account/come_account/',{
        method:'POST',
        headers:{
            'Content-type':'application/json'
        },
        body:JSON.stringify(data)
    }).then(
        function (response) {
            return response.json()
            
        }
    ).then(
        function (come_account) {
            console.log(come_account)
            if(come_account['result']==false){
                error.style.visibility='visible'

            }
            else{
                window.location.assign('../Account_person/Account_person.html')
                localStorage.setItem('token',come_account['token'])
            }
            
        }
    )
    
}
submit.addEventListener('click',com)

function for_password(reload) {
    reload.preventDefault()
    let phone=prompt('شماره موبایل خود را وارد کنید ')
    console.log(phone)
    let data={'number':phone}
    fetch('http://127.0.0.1:8000/account/forggoting_password/',{
        method:"POST",
        headers:{
            'Content-type':'application/json'
        },
        body:JSON.stringify(data)
    })

    
    
}
click_forggot_pasword.addEventListener('click',for_password)