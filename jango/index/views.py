from django.shortcuts import render
from django.http import JsonResponse
import json
from login.models import *

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


