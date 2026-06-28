from django.urls import path
from .views import *
urlpatterns=[
    path('chart/',Draw_chart),
    path('show_seggestion/',show_seggestion)
]