let submit=document.getElementById('submit')
let back=document.getElementsByClassName("back")
let error=document.getElementById('error')

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
                error.style.color='green'
                error.textContent='ثبت نام شما با موفقیت ثبت شد '
            }
            else{
                alert(user.result)
            }
            
        }
    )

    

}
submit.addEventListener('click',login)