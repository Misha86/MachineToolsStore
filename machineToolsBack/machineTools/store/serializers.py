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

    def to_representation(self, instance):
        """Display category and product type names."""
        category_name = instance.category.name
        product_type_name = instance.product_type.name
        data = super().to_representation(instance)
        data["category"] = category_name
        data["product_type"] = product_type_name
        return data


class CategorySerializer(serializers.ModelSerializer):
    """Serializer for getting all products in the store."""
    children = serializers.HyperlinkedRelatedField(
        many=True,
        read_only=True,
        view_name="category_detail",
        lookup_field="slug"
    )
    products = serializers.HyperlinkedIdentityField(view_name="category_products",
                                                    lookup_field="slug")

    class Meta:
        model = Category
        fields = ["name", "slug", "is_active", "parent", "children", "products"]

    def to_representation(self, instance):
        """Display parent name and empty string if category does'not have products."""
        parent = instance.parent
        products = instance.products.all()
        data = super().to_representation(instance)
        if parent:
            data["parent"] = parent.name
        if not products:
            data["products"] = ""
        return data
