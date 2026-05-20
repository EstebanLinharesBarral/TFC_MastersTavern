from rest_framework import serializers
from .models import Characters, Weapons
import json

class CharacterSerializer(serializers.ModelSerializer):

    weapons = serializers.PrimaryKeyRelatedField(
        queryset=Weapons.objects.all(),
        many=True,
        required=False
    )

    class Meta:
        model = Characters
        fields = "__all__"
        read_only_fields = ["user"]

    def to_internal_value(self, data):
        data = data.copy()

        int_fields = ["level", "STR", "DEX", "CON", "INT", "WIS", "CHA"]

        for field in int_fields:
            value = data.get(field)

            if value == "" or value is None:
                data[field] = None
            else:
                try:
                    data[field] = int(value)
                except:
                    data[field] = None

        avatar = data.get("avatar")
        if isinstance(avatar, dict):
            data["avatar"] = ""

        return super().to_internal_value(data)
    
    def create(self, validated_data):
        weapons = validated_data.pop("weapons", [])
        character = Characters.objects.create(**validated_data)
        if weapons:
            character.weapons.set(weapons)

        return character
    
class WeaponSerializer(serializers.ModelSerializer):
    class Meta:
        model = Weapons
        fields = "__all__"