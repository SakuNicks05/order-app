import requests
import json
from django.http import JsonResponse
from django.shortcuts import render, redirect
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from .models import Order

# Create your views here.
# @login_required
def submit_list(request):
    if request.method != "POST":
        return JsonResponse({"error": "POST required"}, status=400)
    
    try:
        data = json.loads(request.body)
    except json.JSONDecodeError:
        return JsonResponse({"error": "Invalid JSON"}, status=400)

    for item in data:
        Order.objects.create(
            user=request.user,
            food=item["food"],
            drink=item["drink"],
            num_drink=int(item["drinkQ"]), # models name || JSON name
            num_food=int(item["foodQ"])
        )
    return JsonResponse({"success" : True})

def display_orders(request):
    orders = Order.objects.all()
    return render(request, "dashboard.html", {
        "orders": orders
    })

def enter_food(request):
    return render(request, "enter-order.html")

def clear_dash(request):
    if request.method == "POST": # if user clicks button
        Order.objects.all().delete()
    return redirect("dashboard")

def sign_up(request):
    if request.method == "POST":
        username = request.POST["username"]
        password = request.POST["password"]

        if User.objects.filter(username=username).exists():
            return render(request, "signup.html", {
                "error" : "Username is already taken"
            })
        else:
            user = User.objects.create_user(
                username=username,
                password=password
            )
        login(request, user)
        return redirect("enterfood")

    return render(request, "signup.html")

def log_in(request):
    if request.method == "POST":
        username = request.POST["username"]
        password = request.POST["password"]

        user = authenticate(
            request,
            username=username,
            password=password
        )

        if user.is_staff:
            login(request, user)
            return redirect("dashboard")

        if user is not None:
            login(request, user)
            return redirect("enterfood")
        else:
            return redirect(request, "log_in", {
                "error" : "Wrong password or username"
            })
    return render(request, "login.html")

def log_out(request):
    logout(request)
    return redirect("login")