"""Module for store app views."""
from rest_framework import generics
from rest_framework.permissions import IsAdminUser

from .models import Product
from .permissions import ReadOnly
from .serializers import ProductSerializer


class ProductListView(generics.ListCreateAPIView):
    """This view is used to display all products in the store."""

    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [IsAdminUser | ReadOnly]
