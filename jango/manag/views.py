from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_GET,require_POST
import json
from .models import *
from datetime import timedelta,datetime
from login.models import *
eror=0
time='00:00:10'
finish='00:00:00'
finish=datetime.strptime(finish,'%H:%M:%S')
time=datetime.strptime(time,'%H:%M:%S')
idd=set()

@csrf_exempt
@require_POST
def login_manage(request):
    global eror
    data=json.loads(request.body.decode('UTF-8'))
   # manage.objects.create(
    #    name=data['name'],
     #   password=data['password']
    #)
    print(eror)
    for i in manage.objects.all():
        if data['name']==i.name and data['password']==i.password:
            eror=0
            return JsonResponse({
                'result':True
            })
        
        elif eror!=3 or eror>=3 :
            eror+=1
            if eror==3 or eror>=3:
                return JsonResponse({
                    'result':'run'
                })
            else:
                return JsonResponse({
                    'result':False
                })
@require_GET
def timing(request):
    global time,eror
    
    time=time-timedelta(seconds=1)
    print(time)
    if finish==time:
        eror=0
        return JsonResponse({
            'result':'open'
        })
    else:
        return JsonResponse({
            'result':time.strftime('%H:%M:%S')
        })

def show_user(request):
    data=[]
    number=0
    for i in users.objects.all():
        number+=1
        data_user={
            'name':i.name,
            'number':i.number,
            'age':i.age,
            'password':i.password,
            'gender':i.gender,
            'accept':i.accept,
            'regestration':i.regestration

        }
        data.append(data_user)
    return JsonResponse({
        'population':number,
        'result':data
    })
@csrf_exempt
@require_POST
def search_user(request):
    data=json.loads(request.body)
    print(data)
    search=users.objects.filter(number=data['data'])
    if search:
        data_user=[]
        for i in users.objects.all().filter(number=data['data']):
            data_user.append({
                'name':i.name,
                'number':i.number,
                'age':i.age,
                'password':i.password,
                'gender':i.gender,
                'accept':i.accept,
                'regestration':i.regestration

             })
        return JsonResponse({
            'ans':True,
            'result':data_user
        })
    else:
        return JsonResponse({
            'ans':False,
        })

def show_sms(request):
    data=[]
    for i in SMS_user.objects.all():
        data.append({
            'id':i.id,
            'name':i.user.name,
            'number':i.user.number,
            'text':i.text
        })
    return JsonResponse({
        'result':data
    })
# let data={'id':id,'number':number,'reject':reject}
@csrf_exempt
@require_POST
def answer_to_user(request):
    data=json.loads(request.body.decode('UTF-8'))
    print(data)
    data_user=SMS_user.objects.filter(id=data['id'])
   
    if data_user:
        data_user.delete()
        print(data_user)
        return JsonResponse({
            'result':True
        })
    else:
        return JsonResponse({
            'result':False
        })


def show_number_message(request):
    number=0
    for i in SMS_user.objects.all():
        number+=1
        print(number)
    return JsonResponse({
        'result':number
    })

@csrf_exempt
@require_POST
def send_sms(request):
    data=json.loads(request.body.decode('UTF-8'))
    data=data['data']
    print(data)
    return JsonResponse({
        'result':True
    })
@csrf_exempt
@require_POST
def save_tour(request):
    global idd
    file=request.FILES.getlist('file')
    name_place=request.POST.get('name_place')
    expresion=request.POST.get('expresion')
    price=request.POST.get('price')
    upload_tourist.objects.create(
        name_place=name_place,
        expresion=expresion,
        price=price

    )
    data=upload_tourist.objects.latest('id')
    print(data.id)
    for i in file:
        upload_image.objects.create(
            image=i,
            witch_tour=data
        )
    return JsonResponse({
        'id':True
    })
@csrf_exempt
@require_POST
def delet_countent(request):
    data=json.loads(request.body)
    print(data)
    if data['content']=='1':
        data=upload_tourist.objects.filter(id=data['id'])
        data.delete()
        print('lololololololo')
        return JsonResponse({
            'result':True
        })
    else:
        data=upload_tourist_dongi.objects.filter(id=data['id'])
        data.delete()
        return JsonResponse({
            'result':True
        })


@csrf_exempt
@require_POST  
def save_tour_dongi(request):
    files=request.FILES.getlist('file')
    name_place_two=request.POST.get('name_place_two')
    expresion_two=request.POST.get('expresion_two')
    price_two=request.POST.get('price_two')
    upload_tourist_dongi.objects.create(
        name_place=name_place_two,
        expresion=expresion_two,
        price=price_two
    )
    data=upload_tourist_dongi.objects.latest('id')
    

    for i in files:
        upload_image.objects.create(
            image=i,
            witch_tour_two=data
        )

    return JsonResponse({
        'result':True
    })

@csrf_exempt
@require_POST
def select_string(requets):
    data=json.loads(requets.body)
    print(data)
    if data['text']=='dongi':
        number=[]
        for i in upload_tourist_dongi.objects.all():
            number.append(i.id)
        return JsonResponse({
            'result':number
        })
    elif data['text']=='tour':
        number=[]
        for i in upload_tourist.objects.all():
            number.append(i.id)
        return JsonResponse({
            'result':number
        })
@csrf_exempt
@require_POST
def show_info_select_data(request):
    data=json.loads(request.body)
    if data['part']=='tour':
        data=upload_tourist.objects.get(id=data['number'])
        imag=[]
        price=int(data.price)
        
        for i in upload_image.objects.all().filter(witch_tour=data.id):
            imag.append({
                'id':i.id,
                'image':i.image.url
            })
        print(imag)
        return JsonResponse({
            'name_place':data.name_place,
            'expression':data.expresion,
            'price':round(data.price),
            'image':imag
        })
        

    else:
        data=upload_tourist_dongi.objects.get(id=data['number'])
        imag=[]
        for i in upload_image.objects.all().filter(witch_tour_two=data.id):
            imag.append({
                'id':i.id,
                'image':i.image.url
            })
        return JsonResponse({
            'name_place':data.name_place,
            'expression':data.expresion,
            'price':round(data.price),
            'image':imag
        })
    
@csrf_exempt
@require_POST
def update_content(request):
    if request.POST['witch_part']=='tour':
        data=upload_tourist.objects.filter(id=request.POST['witch_number'])
        data.update(name_place=request.POST['one'],expresion=request.POST['two'],price=request.POST['three'])
        if request.POST['number_image']!='' and request.FILES['choice_file']!='':
            file=request.FILES['choice_file']
            print(file.read())
            data_imag=upload_image.objects.get(id=request.POST['number_image'])
            data_imag.image=file
            data_imag.save()
    else:
        data=upload_tourist_dongi.objects.filter(id=request.POST['witch_number'])
        data.update(name_place=request.POST['one'],expresion=request.POST['two'],price=request.POST['three'])
        if request.POST['number_image']!='' and request.FILES['choice_file']!='':
            file=request.FILES['choice_file']
            print(file.read())
            data_imag=upload_image.objects.get(id=request.POST['number_image'])
            data_imag.image=file
            data_imag.save()
    return JsonResponse({
        'result':True
    })








# Create your views here.
