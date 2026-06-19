from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_GET,require_POST
import json
from .models import *
from datetime import timedelta,datetime
from login.models import *
file=list()
eror=0
time='00:00:10'
finish='00:00:00'
finish=datetime.strptime(finish,'%H:%M:%S')
time=datetime.strptime(time,'%H:%M:%S')
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
    global file
    file=request.FILES.getlist('file')
    name_place=request.POST.get('name_place')
    expresion=request.POST.get('expresion')
    price=request.POST.get('price')
    upload_tourist.objects.create(
        name_place=name_place,
        expresion=expresion,
        price=price

    )
    data=upload_tourist.objects.get(name_place=name_place)
    return JsonResponse({
        'id':data.id
    })
# def upolad_file(reqest):

# Create your views here.
