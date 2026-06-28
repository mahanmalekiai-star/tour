from django.shortcuts import render
from django.http import JsonResponse
import json
from login.models import *
from manag.models import *

# Create your views here.
def Draw_chart(request):
    labels=[]
    data=[]
    for i in users.objects.all():
        labels.append(i.regestration)
        data.append(i.id)
    return JsonResponse({
        'label':labels,
        'data':data
    })

def show_seggestion(request):
    data=[]
    for i in commnts_user.objects.all():
        image=[]
        for j in upload_image.objects.all().filter(which_user_text=i.id):
            image.append(j.image.url)
        data.append({
            'name':i.user.name,
            'text':i.text,
            'image':image
        })
    return JsonResponse({
        'result':data
    })

