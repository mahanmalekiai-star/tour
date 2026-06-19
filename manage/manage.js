let submit=document.getElementById('submit')
let timi=document.getElementById('timi')
let setintervall
function login_manage(manage) {
    manage.preventDefault()
    
    let name=document.getElementById('name').value
    let password=document.getElementById('password').value
    let data={'name':name,'password':password}
    fetch('http://127.0.0.1:8000/manage/login/',{
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
        function(login){
            if(login['result']==false){
                alert('تنها مدیر میتواند به اینجا بیاید')
            }
            else if(login['result']==true){
                window.location.assign('all_activity_manage/index.html')
            }
            else{
                document.getElementById('name').disabled=true
                document.getElementById('password').disabled=true
                setintervall=setInterval(timing,1000)
                console.log(y)
                
            }
        }
    )

    
}
submit.addEventListener('click',login_manage)
window.onload=login_manage
function timing(){
    fetch('http://127.0.0.1:8000/manage/timing/').then(
        function (response) {
            return response.json()
            
        }
    ).then(
        function (timing) {
            if(timing['result']=='open'){
                document.getElementById('name').disabled=false
                document.getElementById('password').disabled=false
                timi.innerHTML=''
                clearInterval(setintervall)

            }
            else{
                timi.textContent=timing['result']
            }
            
           
            
            


            
        }
    )
    
}