from django.contrib import admin

# Register your models here.
from django.contrib import admin
from .models import Characters, Weapons, Armors

admin.site.register(Weapons)
admin.site.register(Armors)

@admin.register(Characters)
class CharactersAdmin(admin.ModelAdmin):
    filter_horizontal = ("weapons",)

