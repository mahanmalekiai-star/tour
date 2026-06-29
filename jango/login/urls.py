from django.urls import path
from .views import *
urlpatterns=[
    path('user/',login),
    path("sendig_code_for_user/",sendig_code_for_user)
]