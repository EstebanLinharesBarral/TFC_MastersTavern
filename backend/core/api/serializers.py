from rest_framework import serializers
from .models import Characters

class CharacterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Characters
        fields = "__all__"
        read_only_fields = ["user"]
    
    # Conversión automática de strings → ints
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
                except (ValueError, TypeError):
                    data[field] = None

        # Avatar: evitar objetos raros
        avatar = data.get("avatar")
        if isinstance(avatar, dict):
            data["avatar"] = ""

        return super().to_internal_value(data)