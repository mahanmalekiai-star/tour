from django.urls import path
from .views import *
urlpatterns=[
    path('login/',login_manage),
    path('timing/',timing),
    path('show_user/',show_user),
    path('search_user/',search_user),
    path('show_sms/',show_sms),
    path('answer_to_user/',answer_to_user),
    path('show_number_message/',show_number_message),
    path('send_sms/',send_sms),
    path('save_tour/',save_tour)
]