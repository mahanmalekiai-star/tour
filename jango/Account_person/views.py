from django.shortcuts import render
from django.http import JsonResponse
from account.views import name_users
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_GET ,require_POST
from login.models import *
import json
from manag.models import *

@require_GET
def name_user(request):
    print(name_users())
    return JsonResponse({
        'result':name_users()
    })
@csrf_exempt
@require_POST
def get_sms(request):
    data_user=[]
    
    data=json.loads(request.body.decode('UTF-8'))
    if data['check']==True:
        person=users.objects.get(number=data['phone'])
        SMS_user.objects.create(
            text=data['text'],
            user=person
        )
        return JsonResponse({
            'result':True
        })
    else:
        return JsonResponse({
            'result':False
        })
    
def show_all_tourist(request):
    data=[]
    
    for i in upload_tourist.objects.all():
        money=int(i.price)
        image=[]
        for j in upload_image.objects.all().filter(witch_tour=i.id):
            image.append(j.image.url)
            print(j.image.url)
        data.append({
            'id':i.id,
            'name_place':i.name_place,
            'expresion':i.expresion,
            'price':format(money,','),
            "image":image
        })
    print(data)

   
    return JsonResponse({
        'result':data
    })



# Create your views here.
