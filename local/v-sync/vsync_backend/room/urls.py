from django.urls import path
from .views import *

urlpatterns = [
    path('create/', CreateRoom.as_view()),
    path('join/', JoinRoom.as_view()),
    path('image/', Image.as_view()),
    path('questions/', Questions.as_view()),
    path('record_audio/', RecordAudio.as_view()),
    path('checkpoint/', CheckPoint.as_view()),
    path('dashboard/', Dashboard.as_view()),
    path('correlation/', VsyncCorrelation.as_view()),
    path('restart/', Restart.as_view()),
    path('clear_all/', ClearAll.as_view()),
]