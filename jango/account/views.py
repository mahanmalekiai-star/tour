from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.http import require_GET,require_POST
from django.views.decorators.csrf import csrf_exempt
import json
from login.models import *
from rest_framework_simplejwt.tokens import RefreshToken
import requests
#data={'name':name,'password':password}
# number_phone=int()
for_account=[]
def name_users():
    return for_account

@csrf_exempt
@require_POST
def come_account(request):
    data=json.loads(request.body.decode('UTF-8'))
    name=users.objects.filter(number=data['name'])
    if name:
        for i in users.objects.all().filter(number=data['name']):
            print(i)
            password=i.password.strip()
            password_two=data['password'].lower()
            if password==password_two:
                token=RefreshToken.for_user(i)
                print(token)
              

                
                # number_phone=i.number
                return JsonResponse({
                        'result':True,
                        'token':str(token.access_token)
                })
            else:
                return JsonResponse({
                    'result':False
                }) 
    else:
        return JsonResponse({
            'result':False
        })
    
@csrf_exempt
@require_POST
def forggoting_password(request):
    data=json.loads(request.body)
    print(data)
    data_user=users.objects.get(number=data['number'])
    url = "https://api.sms-webservice.com/api/V3/SendBulk"
    payload = {
        "ApiKey": "279011-E2EAFD95578F4CD688F13C7151BF978C",
        "Text":f'رمز عبور شما در سایت کیاناوین {data_user.password}',
        "Sender": 50004075005515 ,
        "Recipients": [
            {
            "Destination": data['number']
            }
        ]
    }   

    headers = {
        'Content-type':'application/json'
    }

    print(requests.post(url, headers=headers, json=payload))
    return JsonResponse({
        'result':'send'
    })


    
        

   
# Create your views here.
