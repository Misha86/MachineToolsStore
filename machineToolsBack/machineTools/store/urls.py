"""Module for all store app urls."""
from django.urls import path

from . import views

app = "store"

urlpatterns = [
    path("categories/", views.CategoryListCreateView.as_view(), name="category_list"),
    path("categories/<str:slug>", views.CategoryRetrieveView.as_view(), name="category_detail"),
    path(
        "categories/<str:slug>/products",
        views.CategoryProductsRetrieveView.as_view(),
        name="category_products"),
    path("products/", views.ProductListView.as_view(), name="products_list"),
]
