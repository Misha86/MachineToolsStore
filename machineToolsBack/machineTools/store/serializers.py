"""The module includes all serializers for Store App."""
from rest_framework import serializers

from .models import Product, ProductImage


class ProductImageSerializer(serializers.ModelSerializer):
    """Serializer for getting product images."""

    class Meta:
        model = ProductImage
        fields = ("image", "alt_text", "is_feature")


class ProductSerializer(serializers.ModelSerializer):
    """Serializer for getting all products in the store."""

    images = ProductImageSerializer(many=True, read_only=True)

    class Meta:
        model = Product
        fields = (
            "title",
            "description",
            "regular_price",
            "discount_price",
            "is_active",
            "product_type",
            "category", "images")
