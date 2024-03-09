from django.urls import path
from . import views

urlpatterns = [
    path('', views.getRoutes, name="hello"),
    path('products/', views.getProducts, name="products"),
    path('product/<str:pk>', views.getProduct, name="product")
]