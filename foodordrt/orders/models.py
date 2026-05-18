from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Order(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    food = models.CharField(max_length=100)
    drink = models.CharField(max_length=100)
    num_drink = models.IntegerField(default=0)
    num_food = models.IntegerField(default=0)
