from django.urls import path
from .views import GroceryListAPIView, GroceryDetailAPIView, GroceryToggleAPIView

urlpatterns = [
    path('grocery/', GroceryListAPIView.as_view(), name="grocery-list"),
    path('grocery/<int:pk>/', GroceryDetailAPIView.as_view(), name="grocery-detail"),
    path('grocery/<int:pk>/toggle/', GroceryToggleAPIView.as_view(), name="grocery-toggle"),
]