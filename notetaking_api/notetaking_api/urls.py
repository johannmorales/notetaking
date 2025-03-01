from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('users.urls')),
    path('api/', include('notes.urls')),
]

from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

# Define Swagger schema view
schema_view = get_schema_view(
   openapi.Info(
      title="Note Taking API",
      default_version='v1',
      description="API documentation for the Note Taking application",
      contact=openapi.Contact(email="admin@admin.com"),
      license=openapi.License(name="MIT License"),
   ),
   public=True,
   permission_classes=(permissions.IsAuthenticatedOrReadOnly,),
)

urlpatterns += [
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),  # Swagger UI

]
