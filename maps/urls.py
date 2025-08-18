from . import views
from django.urls import path                                                                                                                             
from django.views.decorators.csrf import csrf_exempt

urlpatterns = [ 
    path(r'', views.default_map, name="default"),
    path(r'get-stats', csrf_exempt(views.get_stats), name="get-stats")
]
