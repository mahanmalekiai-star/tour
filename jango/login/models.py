from django.db import models
class users(models.Model):
    name=models.CharField(max_length=100)
    number=models.BigIntegerField(unique=True)
    age=models.IntegerField()
    password=models.CharField(max_length=100)
    gender=models.CharField(max_length=100)
    accept=models.BooleanField()
    regestration=models.DateField()
class SMS_user(models.Model):
    text=models.CharField(max_length=400)
    user=models.ForeignKey(users,on_delete=models.CASCADE,to_field='number')






# Create your models here.
