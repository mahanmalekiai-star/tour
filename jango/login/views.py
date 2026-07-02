from django.shortcuts import render
from django.views.decorators.http import require_GET , require_POST
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
import json
from .models import *
from datetime import date
import random
import requests
#let data={'name':name,'number':number,'age':age,'password':password,'gender':gender,'accept':accept}
number=0
for_securety=[]
@csrf_exempt
@require_POST
def login(request):
    global number
    data=json.loads(request.body.decode('UTF-8'))
    age=int(data['age'])
    number=users.objects.filter(number=data['number'])
    print(number)
    
    

    if data['number'][0]!='0' or data['number'][1]!='9' or len(data['number'])!=11 or age<15 or len(data['password'])<8 or data['accept']==False   :
        return JsonResponse({
            'result':False
        })    
    elif number:
        return JsonResponse({
            'result':'با این شماره قبلا ثبت نام کرده ایید'
        })
    else:
        number=random.randint(1000,9999)
        for_securety.append({
            'phone':data['number'],
            'code':number
        })
        url = "https://api.sms-webservice.com/api/V3/SendBulk"
        payload = {
            "ApiKey": "279011-E2EAFD95578F4CD688F13C7151BF978C",
            "Text":f'کد تایید شما در تور kianovin {number}',
            "Sender": 50004075005515 ,
            "Recipients": [
                {
                "Destination": data['number']
                }
            ]
        }   

        headers = {
            'Content-Type': 'application/json' 
        }

        print(requests.post(url, headers=headers, json=payload),number)
        return JsonResponse({
            'result':True

        })
@csrf_exempt
@require_POST
def sendig_code_for_user(request):
    data=json.loads(request.body.decode('UTF-8'))
    print(for_securety)

    for i in range(len(for_securety)):
        if data['number']==for_securety[i]['phone'] and int(data['code'])==for_securety[i]['code']:
            users.objects.create(
                name=data['name'],
                number=data['number'],
                age=data['age'],
                password=data['password'].strip().lower(),
                gender=data['gender'],
                accept=data['accept'],
                regestration=date.today().strftime('%Y-%m-%d')
            )
            for_securety.remove(for_securety[i])
            return JsonResponse({
                'result':True
            })
    else:
        return JsonResponse({
            'result':False
        })
        
            
# Create your views here.
