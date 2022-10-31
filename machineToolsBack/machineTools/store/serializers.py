"""The module includes all serializers for Store App."""
from rest_framework import serializers

from .models import Category, Product, ProductImage


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


class CategorySerializer(serializers.ModelSerializer):
    """Serializer for getting all products in the store."""
    children = serializers.HyperlinkedRelatedField(
        many=True,
        read_only=True,
        view_name="category_detail",
        lookup_field="slug"
    )   
    products = ProductSerializer

    class Meta:
        model = Category
        fields = ["name", "slug", "is_active", "parent", "children", "products"]

    def to_representation(self, instance):
        """Display parent name."""
        parent = instance.parent
        data = super().to_representation(instance)
        if parent:
            data["parent"] = parent.name
        return data
