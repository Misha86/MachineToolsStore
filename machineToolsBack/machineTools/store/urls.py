"""Module for all store app urls."""
from django.urls import path

from . import views

app = "store"

urlpatterns = [
    path("products/", views.ProductListView.as_view(), name="products_list"),
]
