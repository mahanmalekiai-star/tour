let submit=document.getElementById('submit')
let error=document.getElementById('error')
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
            }
            
        }
    )
    
}
submit.addEventListener('click',com)