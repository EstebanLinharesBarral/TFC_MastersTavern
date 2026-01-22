from django.contrib import admin
from .models import Campaing, Session, Character, CharSheet, Weapon, Armor

# Register your models here.
@admin.register(Campaing)
class CampaingAdmin(admin.ModelAdmin):
    list_display = ('title', 'image', 'description', 'system', 'created_at', 'updated_at')
    list_filter = ('system', 'users', 'created_at', 'updated_at')
    search_field = 'title'

@admin.register(Session)
class SessionAdmin(admin.ModelAdmin):
    list_display = ('start_date', 'end_date')
    list_filter = ('start_date', 'end_date')

@admin.register(Character)
class AdminCharacter(admin.ModelAdmin):
    list_display = ('name', 'race', 'background', 'moral', 'goodness', 'created_at', 'updated_at')
    list_filter = ('race', 'background', 'moral', 'goodness', 'created_at', 'updated_at')
    search_field = 'name'

@admin.register(CharSheet)
class AdminCharSheet(admin.ModelAdmin):
    list_display = ('strength', 'dexterity', 'constitution', 'inteligence', 'wisdom', 'charisma', 'level', 'classdnd', 'created_at', 'updated_at')
    list_filter = ('level', 'classdnd', 'created_at', 'updated_at')

@admin.register(Weapon)
class AdminWeapon(admin.ModelAdmin):
    list_display = ('name', 'bonus', 'damage', 'created_at', 'updated_at')
    list_filter = ('damage', 'created_at', 'updated_at')
    search_field = 'name'

@admin.register(Armor)
class AdminArmor(admin.ModelAdmin):
    list_display = ('name', 'ca', 'stealth', 'type', 'created_at', 'updated_at')
    list_filter = ('ca', 'stealth', 'type', 'created_at', 'updated_at')
    search_field = 'name'