from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.http import require_GET,require_POST
from django.views.decorators.csrf import csrf_exempt
import json
from login.models import *

#data={'name':name,'password':password}
number_phone=int()
for_account=str()
def name_users():
    return for_account,number_phone
@csrf_exempt
@require_POST
def come_account(request):
    global for_account,number_phone
    data=json.loads(request.body.decode('UTF-8'))
    name=users.objects.filter(number=data['name'])
    if name:
        for i in users.objects.all().filter(number=data['name']):
            print(i)
            password=i.password.strip()
            if password==data['password']:
                number_phone=i.number
                for_account=i.name
                name_users()
                return JsonResponse({
                        'result':True
                })
            else:
                return JsonResponse({
                    'result':False
                }) 
        else:
            return JsonResponse({
                'result':False
            })
    else:
        return JsonResponse({
            'result':False
        })
    
        

   
# Create your views here.
