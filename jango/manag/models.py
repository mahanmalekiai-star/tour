from django.db import models
from login.models import *
class manage(models.Model):
    name=models.CharField(max_length=100)
    password=models.CharField(max_length=100)
class upload_tourist(models.Model):
    name_place=models.CharField(max_length=100)
    expresion=models.TextField()
    price=models.DecimalField(max_digits=10,decimal_places=1)
class upload_tourist_dongi(models.Model):
    name_place=models.CharField(max_length=100)
    expresion=models.TextField()
    price=models.DecimalField(max_digits=10,decimal_places=1)

class upload_image(models.Model):
    image=models.FileField(upload_to='tourist/')
    witch_tour=models.ForeignKey(upload_tourist,on_delete=models.CASCADE,null=True)
    witch_tour_two=models.ForeignKey(upload_tourist_dongi,on_delete=models.CASCADE,null=True)
    which_user_text=models.ForeignKey(commnts_user,on_delete=models.CASCADE,null=True)



# Create your models here.
