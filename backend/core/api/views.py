import json
from django.http import JsonResponse
from django.contrib.auth.models import User
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import authenticate
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import viewsets
from .serializers import CharacterSerializer, WeaponSerializer, ArmorSerializer
from .models import Characters, Weapons, Armors

# Create your views here.
@csrf_exempt
def register(request):
    if request.method != "POST":
        return JsonResponse({"error": "Método no permitido"}, status=405)

    try:
        data = json.loads(request.body)
        print(request.body)

        first_name = data.get('first_name')
        last_name = data.get('last_name')
        username = data.get("username")
        email = data.get("email")
        password = data.get("password1")
        password2 = data.get("password2")

        if not username or not password:
            return JsonResponse({"error": "Faltan datos"}, status=400)

        if User.objects.filter(username=username).exists():
            return JsonResponse({"error": "Usuario ya existe"}, status=400)
        
        if password != password2:
            return JsonResponse({"error": "Las contraseñas no son la misma"}, status=400)

        user = User.objects.create_user(
            first_name = first_name,
            last_name = last_name,
            username=username,
            email=email,
            password=password
        )

        return JsonResponse({
            "message": "Usuario creado",
            "username": user.username
        })

    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)

@csrf_exempt
def login(request):
    data = json.loads(request.body)

    username = data.get("username")
    password = data.get("password")

    user = authenticate(username=username, password=password)

    if user is None:
        return JsonResponse({"error": "Credenciales incorrectas"}, status=400)

    return JsonResponse({
        "message": "Login correcto",
        "username": user.username
    })

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def me(request):
    user = request.user

    return Response({
        "id": user.id,
        "username": user.username,
        "email": user.email,
        "first_name": user.first_name,
        "last_name": user.last_name,
    })

# PERSONAJE
class CharacterViewSet(viewsets.ModelViewSet):
    queryset = Characters.objects.all()
    serializer_class = CharacterSerializer

    def get_queryset(self):
        queryset = Characters.objects.filter(user=self.request.user)

        name = self.request.query_params.get("name")
        char_class = self.request.query_params.get("charClass")
        race = self.request.query_params.get("race")
        id = self.request.query_params.get("id")

        if name:
            queryset = queryset.filter(name__icontains=name)

        if char_class:
            queryset = queryset.filter(charClass=char_class)
        
        if race:
            queryset = queryset.filter(race=race)

        if id:
            queryset = queryset.filter(id=id)

        return queryset
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

# ARMAS
@api_view(['GET'])
def weapons_list(request):
    if request.method != 'GET':
        return JsonResponse({"error": "Método no permitido"}, status=405)
    
    weapons = Weapons.objects.all()
    serializer = WeaponSerializer(weapons, many=True)
    return Response(serializer.data)

# ARMADURAS
@api_view(['GET'])
def armors_list(request):
    if request.method != 'GET':
        return JsonResponse({"error": "Método no permitido"}, status=405)
    
    armors = Armors.objects.all()
    serializer = ArmorSerializer(armors, many=True)
    return Response(serializer.data)
