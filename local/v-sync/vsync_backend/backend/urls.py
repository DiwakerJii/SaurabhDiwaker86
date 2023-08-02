from django.contrib import admin
from django.urls import path, include
from . import views

urlpatterns = [

    # include apps urls.py
    path('api/accounts/', include('accounts.urls')),
    path('api/room2/', include('room.urls')),
    path('api/instant/', include('instant.urls')),
    path('api/payment/', include('payment.urls')),
    path('admin/', admin.site.urls),
    path('', views.index, name='index'),
    path('spectrogram/', views.index, name='index'),
    path('couple/<str:typ>/paymentRedirect/<str:response>/<str:roomid>/', views.index, name='index'),
]