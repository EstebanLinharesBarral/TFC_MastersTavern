import json
from django.http import JsonResponse
from django.contrib.auth.models import User
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import authenticate

# Create your views here.
@csrf_exempt
def register(request):
    if request.method != "POST":
        return JsonResponse({"error": "Método no permitido"}, status=405)

    try:
        data = json.loads(request.body)

        first_name = data.get('first_name')
        last_name = data.get('last_name')
        username = data.get("username")
        email = data.get("email")
        password = data.get("password1")

        if not username or not password:
            return JsonResponse({"error": "Faltan datos"}, status=400)

        if User.objects.filter(username=username).exists():
            return JsonResponse({"error": "Usuario ya existe"}, status=400)

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
