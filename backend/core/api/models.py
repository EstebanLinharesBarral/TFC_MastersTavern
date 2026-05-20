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

class Weapons(models.Model):
    name = models.CharField(max_length=100)
    damage = models.CharField(max_length=100)
    type = models.CharField(max_length=100)

    def __str__(self):
        return self.name
    
class Armors(models.Model):
    name = models.CharField(max_length=100)
    armor = models.CharField(max_length=100)
    type = models.CharField(max_length=100)

    def __str__(self):
        return self.name

class Characters(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="characters")
    
    avatar = models.FileField(
        upload_to="avatars/",
        blank=True,
        null=True
    )
    name = models.CharField(max_length=100, blank=True)
    level = models.IntegerField(blank=True, null=True)
    charClass = models.CharField(max_length=100, blank=True)
    race = models.CharField(max_length=100, blank=True)
    alignment = models.CharField(max_length=100, blank=True)
    stats = models.JSONField(default=list, blank=True)
    STR = models.IntegerField(blank=True, null=True)
    DEX = models.IntegerField(blank=True, null=True)
    CON = models.IntegerField(blank=True, null=True)
    INT = models.IntegerField(blank=True, null=True)
    WIS = models.IntegerField(blank=True, null=True)
    CHA = models.IntegerField(blank=True, null=True)
    salvation = models.JSONField(default=list, blank=True)
    abilities = models.JSONField(default=list, blank=True)
    background = models.TextField(blank=True)
    feats = models.TextField(blank=True)
    inventory = models.TextField(blank=True)
    weapons = models.ManyToManyField(
        Weapons,
        blank=True
    )
    armor = models.ForeignKey(Armors, on_delete=models.CASCADE, related_name="armors", blank=True, null=True)