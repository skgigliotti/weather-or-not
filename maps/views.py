import json

from django.http import JsonResponse, HttpResponse
from django.shortcuts import render

from maps.weather_stats import Location


def default_map(request):
    return render(request, 'index.html', {})

def get_stats(request, **kwargs):
    lat = request.GET.get('lat')
    lng = request.GET.get('lng')
    location = Location(lat=lat, lng=lng)
    location.get_hourly_stats()
    return JsonResponse(data={
        'temperature': str(round(location.temperature)),
        'wind': str(round(location.wind_speed)),
        'uv': str(round(location.uv_index, 2)),
        'fog': str(round(location.cloud_cover))})
