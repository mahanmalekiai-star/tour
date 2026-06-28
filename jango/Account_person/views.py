from django.shortcuts import render
from django.http import JsonResponse
from account.views import name_users
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_GET ,require_POST
from rest_framework_simplejwt.tokens import AccessToken
from login.models import *
import json
from manag.models import *

def name_user(request):
    for_account=[]
    token=request.headers['Authorization']
    token=AccessToken(token)
    data=users.objects.get(id=token['user_id'])
    for_account.append({
        'name':data.name,
        'number':data.number,
        'regestration':data.regestration
    })

    return JsonResponse({
        're':True,
        'result':for_account
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
def show_tour_dongi(request):
    data=[]
    for i in upload_tourist_dongi.objects.all():
        image=[]
        money=int(i.price)
        for j in upload_image.objects.filter(witch_tour_two=i.id):
            image.append(j.image.url)
        data.append({
            'id':i.id,
            'name_place':i.name_place,
            'expresion':i.expresion,
            'price':format(money,','),
            "image":image

        })
    return JsonResponse({
        'result':data
    })

@csrf_exempt
@require_POST
def suggestion(request):
    files=request.FILES.getlist('files')
    text=request.POST['text']
    formatt=[]
    for i in files :
        os=str(i)
        os=os.upper()
        os=os.split('.')
        formatt.append(os[1])
    answer=bool()
    if files==[]:
        answer=True
    for i in formatt:
        if i in ['JPEG','JPG','PNG','GIF','WebP','TIFF','TIF','RAW','SVG','EPS','MP4','MKV','MOV','WMV','MTS']:
            answer=True
        else:
            answer=False

    if (len(files)<=2 or files==[]) and answer==True and text!=''  : 
        token=request.headers['Authorization']
        token=AccessToken(token)
        
        data=users.objects.get(id=token['user_id'])
        last=commnts_user.objects.create(
            text=text,
            user=data
            )
        for i in files:
            upload_image.objects.create(
            image=i,
            which_user_text=last
            )
        return JsonResponse({
            'result':True
        })
    else:
        return JsonResponse({
            'result':False
        })






# Create your views here.
