from django.db import models
from django.contrib.auth.models import User

user = models.ForeignKey(User, on_delete=models.CASCADE)

# Create your models here.
# class User(models.Model):
#     name = models.CharField(max_length=50)
#     surname = models.CharField(max_length=100, null=True)
#     email = models.CharField(max_length=200, unique=True)
#     username = models.CharField(max_length=100, unique=True)
#     password = models.CharField(max_length=200)