"""Module for store app views."""
from rest_framework import generics
from rest_framework.permissions import IsAdminUser

from .models import Product, Category
from .permissions import ReadOnly
from .serializers import ProductSerializer, CategorySerializer


class CategoryListView(generics.ListCreateAPIView):
    """This view is used to display all categories in the store."""

    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [IsAdminUser | ReadOnly]


class CategoryRetrieveView(generics.RetrieveUpdateAPIView):
    """This view is used to display and update category detail in the store."""

    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [IsAdminUser | ReadOnly]
    lookup_field = "slug"


class ProductListView(generics.ListCreateAPIView):
    """This view is used to display all products in the store."""

    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [IsAdminUser | ReadOnly]
