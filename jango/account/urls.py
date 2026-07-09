from django.urls import path
from .views import *
urlpatterns=[
    path('come_account/',come_account),
    path('forggoting_password/',forggoting_password)
]