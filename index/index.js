let login=document.getElementById('login')
let come=document.getElementById('com')
let swiper=document.getElementById('swiper')
let all_image=document.getElementById('all_img')
let canvas=document.getElementById('canvas')
let ram=null
let suggestion=document.getElementById('suggestion')
function log() {
    window.location.assign('./login/login.html')
}
login.addEventListener('click',log)
function com() {
    window.location.assign('./come/come.html')
    
}
come.addEventListener('click',com)

new Swiper(swiper,{
    loop:true,
    speed:800,
    autoplay:{
        delay:2000
    }
})
function chart() {
    fetch('http://127.0.0.1:8000/index/chart/').then(
        function (response) {
            return response.json()

            
        }
    ).then(
        function (chart) {
            if (ram!=null){
                ram.destroy()

            }
            console.log(chart['label'])
            
            ram=new Chart(canvas,{
                type:'pie',
                data:{
                    labels:chart['label'],
                    datasets:[{
                            label:'کاربران سایت ',
                            data:chart['data'],
                            tension:0.3,
                           
                        }
                    ]
                },
                options:{
                    responsive:true,
                    maintainAspectRatio:false

                }
            })
            
        }
    )
    
}
window.onload=chart
new Swiper(all_image,{
    speed:800,
    autoplay:{
        delay:2000
    }
})

fetch('http://127.0.0.1:8000/index/show_seggestion/').then(
    function (response) {
        return response.json()
            
    }
).then(
    function (show_seggestion) {
    suggestion.innerHTML=''
    show_seggestion['result'].forEach(data => {
        let boox=document.createElement('div')
        boox.style.display='flex'
        boox.style.boxShadow='0 0 5px blue'
        boox.style.width='fit-content'
        boox.style.flexWrap='wrap'
        boox.style.padding='20px'
        boox.style.backgroundColor='white'
        boox.style.height="fit-content"
        boox.style.margin='30px'
        boox.style.borderRadius='20px'
        
        boox.style.width="60%"
                
        data['image'].forEach(im => {
            console.log(im)
            boox.innerHTML+=`<div class="image_tourist" ><a href="jango/${im}" alt="" class="img">نمایش فایل ها</a></div>`
        });
        boox.innerHTML+=`<div class="info"><h4 style="margin-bottom: 10px;" >${data['name']}</h4>   <h4 style="display: inline;">${data['text']}</h4>  </div> `
        suggestion.append(boox)
            
    });

            
    }
)
    