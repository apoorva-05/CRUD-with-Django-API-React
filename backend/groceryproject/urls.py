from django.contrib import admin
from django.urls import path, include
from grocery.views import index

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('grocery.urls')),
    path('', index),  # React frontend
]