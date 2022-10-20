"""The module includes all serializers for Store App."""
from rest_framework import serializers

from .models import Product


class ProductSerializer(serializers.ModelSerializer):
    """Serializer for getting all products in the store."""

    class Meta:
        model = Product
        fields = (
            "title",
            "description",
            "regular_price",
            "discount_price",
            "is_active",
            "slug",
            "product_type",
            "category",
            "created_at",
            "updated_at")
