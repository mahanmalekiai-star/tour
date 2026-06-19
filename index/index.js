let login=document.getElementById('login')
let come=document.getElementById('com')
let swiper=document.getElementById('swiper')
let all_image=document.getElementById('all_img')
let canvas=document.getElementById('canvas')
let ram=null
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