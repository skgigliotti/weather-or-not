import json

from django.http import JsonResponse, HttpResponse
from django.shortcuts import render

from maps.weather_stats import Location


def default_map(request):
    return render(request, 'default.html', {})

def get_stats(request, **kwargs):
    lat = request.GET.get('lat')
    lng = request.GET.get('lng')
    location = Location(lat=lat, lng=lng)
    location.get_hourly_stats()
    return JsonResponse(data={
        'temperature': str(location.temperature),
        'wind': str(location.wind_speed),
        'uv': str(location.uv_index)})
