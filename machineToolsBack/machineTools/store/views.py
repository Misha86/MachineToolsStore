"""Module for store app views."""

from django.shortcuts import get_object_or_404
from rest_framework import generics
from rest_framework.permissions import IsAdminUser

from .models import Category, Product
from .permissions import ReadOnly
from .serializers import CategorySerializer, ProductSerializer


class CategoryListCreateView(generics.ListCreateAPIView):
    """This view is used to display all categories in the store."""

    queryset = Category.objects.viewable()
    serializer_class = CategorySerializer
    permission_classes = [IsAdminUser | ReadOnly]


class CategoryRetrieveView(generics.RetrieveUpdateAPIView):
    """This view is used to display and update category detail in the store."""

    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [IsAdminUser | ReadOnly]
    lookup_field = "slug"


class CategoryProductsRetrieveView(generics.ListCreateAPIView):
    """This view is used to display all category products in the store."""

    serializer_class = ProductSerializer
    permission_classes = [IsAdminUser | ReadOnly]
    lookup_field = "slug"

    def get_queryset(self):
        """Get all category products."""
        print(self.kwargs["slug"])
        category = get_object_or_404(Category, slug=self.kwargs["slug"])
        return category.products.all()


class ProductListView(generics.ListCreateAPIView):
    """This view is used to display all products in the store."""

    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [IsAdminUser | ReadOnly]
