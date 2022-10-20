"""Module with permissions for store application."""
from rest_framework.permissions import SAFE_METHODS, BasePermission


class ReadOnly(BasePermission):
    """Permission which gives access for SAFE_METHODS."""

    def has_permission(self, request, view):
        """Checks if method in SAFE_METHODS."""
        return request.method in SAFE_METHODS
