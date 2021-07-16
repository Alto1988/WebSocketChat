from django.shortcuts import render


def MainView(request):
    return render(request, 'main.html', {})