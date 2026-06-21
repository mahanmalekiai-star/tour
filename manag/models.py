from django.db import models
class manage(models.Model):
    name=models.CharField(max_length=100)
    password=models.CharField(max_length=100)
class upload_tourist(models.Model):
    name_place=models.CharField(max_length=100)
    expresion=models.TextField()
    price=models.DecimalField(max_digits=10,decimal_places=1)
class upload_image(models.Model):
    image=models.FileField(upload_to='tourist/')
    witch_tour=models.ForeignKey(upload_tourist,on_delete=models.CASCADE)



# Create your models here.
