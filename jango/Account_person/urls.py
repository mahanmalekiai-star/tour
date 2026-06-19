from django.urls import path
from .views import *
urlpatterns=[
    path('name_user/',name_user),
    path('get_sms/',get_sms)
]