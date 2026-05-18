import requests
from django.shortcuts import render, redirect
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout

# Create your views here.



def display_orders(request):
    return render(request, "dashboard.html")

def enter_food(request):
    pass
    return render(request, "enter-order.html")

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

        if user is not None:
            login(request, user)
            return redirect("enterfood")
        else:
            return redirect(request, "log_in", {
                "error" : "Wrong password or username"
            })
    return render(request, "login.html")