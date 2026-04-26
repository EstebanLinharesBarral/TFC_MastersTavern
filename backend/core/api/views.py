import json
from django.shortcuts import render
from django.http import JsonResponse

# Create your views here.
def register(request):
    if request.method == "POST":
        data = json.loads(request.body)

        first_name = data.get("first_name")
        last_name = data.get("last_name")
        email = data.get("email")
        username = data.get("username")
        password = data.get("password1")

        return JsonResponse({
            "first_name": first_name,
            "last_name": last_name,
            "email": email,
            "username": username,
            "password": password
        })
    
    return JsonResponse({"error":"Método inválido"}, status=405)
