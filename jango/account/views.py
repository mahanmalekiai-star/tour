from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.http import require_GET,require_POST
from django.views.decorators.csrf import csrf_exempt
import json
from login.models import *
from rest_framework_simplejwt.tokens import RefreshToken
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
    
        

   
# Create your views here.
