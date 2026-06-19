from django.shortcuts import render
from django.http import JsonResponse
from account.views import name_users
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_GET ,require_POST
from login.models import *
import json
from login.models import *

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
# Create your views here.
