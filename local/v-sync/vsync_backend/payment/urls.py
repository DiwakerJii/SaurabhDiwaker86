
from django.urls import path
from .views import *

urlpatterns = [
    path('', webprint),
    path('ccavResponseHandler/<str:room_id>/', ccavResponseHandler),
    path('ccavRequestHandler/<str:room_id>/', login)
]