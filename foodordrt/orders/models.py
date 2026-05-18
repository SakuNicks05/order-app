from django.db import models

# Create your models here.

class Order(models.Model):
    name = models.CharField(max_length=50)
    food = models.CharField(max_length=50)
    drink = models.CharField(max_length=50)
    num_drink = models.IntegerField(default=0,
                                    max_length=10)
    num_food = models.IntegerField(default=0,
                                   max_length=10)
