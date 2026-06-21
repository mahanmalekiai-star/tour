from django.urls import path
from .views import *
urlpatterns=[
    path('name_user/',name_user),
    path('get_sms/',get_sms),
    path('show_all_tourist/',show_all_tourist)
]