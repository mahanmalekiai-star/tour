let container_two=document.getElementById('container_two')
let container_one=document.getElementById('container_one')
let submit=document.getElementById('submit')
let population=document.getElementById('population')
function users() {
    fetch('http://127.0.0.1:8000/manage/show_user/').then(
        function (response) {
            return response.json()
            
        }
    ).then(
        function (show_user) {
            population.textContent='تعداد کاربران : '+show_user['population']
            show_user['result'].forEach(data_user => {
                console.log(data_user)
                let box=document.createElement('div')
                box.innerHTML=`<h4><h3 style="display: inline;color:green;">نام و نام خانوادگی : </h3>${data_user['name']}</h4> <h4><h3 style="display: inline;color:green;">شماره تلفن : </h3>${data_user['number']}</h4>    <h4 ><h3 style="display: inline;color:green; "> سن : </h3>${data_user['age']}</h4>   <h4 ><h3 style="display: inline;color:green;"> رمز : </h3>${data_user['password']}</h4>  <h4 ><h3 style="display: inline;color:green; "> جنسیت : </h3>${data_user['gender']}</h4>  <h4 ><h3 style="display: inline;color:green;"> توافق نامه : </h3>${data_user['accept']}</h4>  <h4 ><h3 style="display: inline;color:green;"> تاریخ ثبت نام : </h3>${data_user['regestration']}</h4>    `
                box.style.direction='rtl'
                box.style.fontFamily='tahoma'
                box.style.marginTop='30px'
                box.style.marginBottom='30px'
                box.style.boxShadow='0 4px 10px white'
                box.style.color='white'
                box.style.padding='10px'
                box.style.borderRadius='5px'
                box.style.background='transparent'
                box.style.border='1px solid white'
                container_two.append(box)
                
            });
            
        }
    )
    
}
window.onload=users

function search_data(){
    let search=document.getElementById('search').value
    let data={'data':search}
    fetch('http://127.0.0.1:8000/manage/search_user/',{
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
        function (search_user) {
            if(search_user['ans']==true){
                console.log(search_user['result'])
                search_user['result'].forEach(data_user => {
                container_one.innerHTML=''
                let box=document.createElement('div')
                box.innerHTML=`<h4><h3 style="display: inline;color:purple;">نام و نام خانوادگی : </h3>${data_user['name']}</h4> <h4><h3 style="display: inline;color:purple;">شماره تلفن : </h3>${data_user['number']}</h4>    <h4 ><h3 style="display: inline;color:purple;"> سن : </h3>${data_user['age']}</h4>   <h4 ><h3 style="display: inline;color:purple"> رمز : </h3>${data_user['password']}</h4>  <h4 ><h3 style="display: inline;color:purple;"> جنسیت : </h3>${data_user['gender']}</h4>  <h4 ><h3 style="display: inline;color:purple;"> توافق نامه : </h3>${data_user['accept']}</h4>  <h4 ><h3 style="display: inline;color:purple;"> تاریخ ثبت نام : </h3>${data_user['regestration']}</h4>`
                box.style.direction='rtl'
                box.style.fontFamily='tahoma'
                box.style.marginTop='30px'
                box.style.marginBottom='30px'
                box.style.boxShadow='0 4px 10px white'
                box.style.color='white'
                box.style.padding='10px'
                box.style.borderRadius='5px'
                box.style.background='linear-gradient(135deg,#31b1a6,#045b61)'
                box.style.border='1px solid white'
                box.style.width='fit-content'
                box.style.marginLeft='auto'
                box.style.marginRight='auto'
                container_one.append(box)
                
                });

            }else{
                alert('چنین شماره ایی در دیتابیس وجود ندارد ❌')
                document.getElementById('search').value=''
            }
           

            
        }
    )
    function clean() {
        if(document.getElementById('search').value==''){
            container_one.innerHTML=''
        }
        
    }
    setInterval(clean,1000)
}
submit.addEventListener('click',search_data)