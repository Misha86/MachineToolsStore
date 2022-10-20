"""Module for store app admin."""
from django.contrib import admin
from mptt.admin import MPTTModelAdmin

from .models import (Category, Product, ProductImage, ProductSpecification,
                     ProductSpecificationValue, ProductType)


class ProductSpecificationInline(admin.TabularInline):
    """Class for tabular inline ProductSpecification model."""

    model = ProductSpecification
    extra = 4


class ProductSpecificationValueInline(admin.TabularInline):
    """Class for tabular inline ProductSpecificationValue model."""

    model = ProductSpecificationValue
    extra = 4


class ProductImageInline(admin.TabularInline):
    """Class for tabular inline ProductImage model."""

    model = ProductImage


@admin.register(Category)
class CategoryAdmin(MPTTModelAdmin):
    """Admin class for Category model."""

    list_display = ("view_name", "slug", "parent", "is_active", "id")
    empty_value_display = "--empty---"
    list_display_links = ("view_name", "slug")
    readonly_fields = ("slug",)
    search_fields = ("name",)
    list_filter = ("parent", "is_active")

    @admin.display
    def view_name(self, obj):
        """Reload view name arg of Product model.

        Args:
            obj (instance): Category instance

        Returns:
            str: changed name of the category model
        """
        return f"<-------+ {obj.name}" if obj.parent else obj.name


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    """Admin class for Product model."""

    readonly_fields = ("created_at", "updated_at")
    fields = (
        ("title", "description", "is_active"),
        ("regular_price", "discount_price"),
        "product_type", "category",
        ("created_at", "updated_at"))

    list_display = (
        "title",
        "is_active",
        "product_type",
        "category",
        "regular_price",
        "discount_price")
    list_filter = ("product_type", "category", "is_active")
    search_fields = ("title",)
    list_editable = ("is_active",)
    autocomplete_fields = ("category", "product_type")
    inlines = (ProductSpecificationValueInline, ProductImageInline)


@admin.register(ProductType)
class ProductTypeAdmin(admin.ModelAdmin):
    """Admin class for ProductSpecification model."""

    list_display = ("name", "id")
    search_fields = ("name", )
    inlines = (ProductSpecificationInline,)
