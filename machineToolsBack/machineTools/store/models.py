"""Module for store app models."""
from django.db import models
from django.urls import reverse
from django.utils.text import slugify
from mptt.models import MPTTModel, TreeForeignKey


class Category(MPTTModel):
    """Category Table implemented with MPTT."""

    name = models.CharField(verbose_name="Category Name", max_length=255, unique=True)
    slug = models.SlugField(verbose_name="Category save URL", max_length=255, unique=True)
    parent = TreeForeignKey(
        "self",
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        related_name="children")
    is_active = models.BooleanField(default=True)

    class MPTTMeta:
        order_insertion_by = ["name"]

    class Meta:
        verbose_name = "Category"
        verbose_name_plural = "Categories"

    def save(self, *args, **kwargs) -> None:
        """Method for saving model data to the DB."""
        self.slug = slugify(self.name, allow_unicode=True)
        super().save(*args, **kwargs)

    def __str__(self) -> str:
        return self.name

    def get_absolute_url(self) -> str:
        """Method for getting the absolute url of the category list.

        Returns:
            str: URL of the category list
        """
        return reverse("store:category_list", kwargs={"slug": self.slug})


class ProductType(models.Model):
    """ProductType Table provides a list of different types of products that are for sale."""

    name = models.CharField(
        verbose_name="Product Name",
        max_length=100, help_text="Required"
    )

    class Meta:
        verbose_name = "Product Type"
        verbose_name_plural = "Product Types"

    def __str__(self) -> str:
        return self.name


class ProductSpecification(models.Model):
    """Product Specification Table contains product specification or feature for product type."""

    product_type = models.ForeignKey(
        ProductType,
        related_name="product_specifications",
        on_delete=models.RESTRICT)
    name = models.CharField(verbose_name="Specification Name", max_length=100, help_text="Required")
    is_active = models.BooleanField(default=True)

    class Meta:
        verbose_name = "Product Type"
        verbose_name_plural = "Product Types"

    def __str__(self) -> str:
        return self.name


class Product(models.Model):
    """Product Table contains all products."""

    product_type = models.ForeignKey(
        ProductType,
        related_name="products",
        on_delete=models.RESTRICT)
    category = models.ForeignKey(Category, related_name="products", on_delete=models.RESTRICT)
    description = models.TextField(
        verbose_name="description",
        max_length=255,
        help_text="Not Required",
        blank=True)
    title = models.CharField(verbose_name="Product Title", max_length=200)
    is_active = models.BooleanField(
        verbose_name="Product visibility",
        default=True,
        help_text="Change product visibility")
    created_at = models.DateTimeField(verbose_name="Created At", auto_now_add=True)
    updated_at = models.DateTimeField(verbose_name="Updated At", auto_now=True)
    regular_price = models.DecimalField(
        verbose_name="Regular Price",
        max_digits=6,
        decimal_places=2,
        error_messages={
            "name": {
                "max_length": "The price must be between 0 and 9999.99"
            }
        },
        help_text="Maximum 9999.99"
    )
    discount_price = models.DecimalField(
        verbose_name="Discount Price",
        max_digits=6,
        decimal_places=2,
        error_messages={
            "name": {
                "max_length": "The price must be between 0 and 9999.99"
            }
        },
        help_text="Maximum 9999.99"
    )

    class Meta:
        verbose_name = "Product"
        verbose_name_plural = "Products"
        ordering = ("-created_at")

    def get_absolute_url(self) -> str:
        """Method for getting the absolute url of the product.

        Returns:
            str: URL of the product
        """
        return reverse("store:product_detail", kwargs={"id": self.id})

    def __str__(self) -> str:
        return self.title
