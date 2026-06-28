from django.shortcuts import render
from django.views.decorators.http import require_GET , require_POST
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
import json
from .models import *
from datetime import date
#let data={'name':name,'number':number,'age':age,'password':password,'gender':gender,'accept':accept}
@csrf_exempt
@require_POST
def login(request):
    data=json.loads(request.body.decode('UTF-8'))
    age=int(data['age'])
    number=users.objects.filter(number=data['number'])
    print(number)
    
    

    if data['number'][0]!='0' or len(data['number'])!=11 or age<15 or len(data['password'])<8 or data['accept']==False   :
        return JsonResponse({
            'result':False
        })    
    elif number:
        return JsonResponse({
            'result':'با این شماره قبلا ثبت نام کرده ایید'
        })
    else:
        users.objects.create(
            name=data['name'],
            number=data['number'],
            age=data['age'],
            password=data['password'].strip().lower(),
            gender=data['gender'],
            accept=data['accept'],
            regestration=date.today().strftime('%Y-%m-%d')
        )
        return JsonResponse({
            'result':True

        })
        
# Create your views here.
