from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser

# Define the CustomUserAdmin class to manage the user model
class CustomUserAdmin(UserAdmin):
    model = CustomUser
    list_display = ('email', 'is_staff', 'is_active', 'is_superuser')
    list_filter = ('is_staff', 'is_superuser', 'is_active')
    search_fields = ('email',)
    ordering = ('email',)

    # The fields to be displayed in the user form when creating or editing a user
    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        ('Permissions', {'fields': ('is_active', 'is_staff', 'is_superuser')}),
        ('Important dates', {'fields': ('last_login',)}),
    )
    # Add user creation and change forms to include relevant fields
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'password1', 'password2', 'is_staff', 'is_active', 'is_superuser')
        }),
    )
    filter_horizontal = ()
    list_per_page = 25

# Register the CustomUser model with the CustomUserAdmin
admin.site.register(CustomUser, CustomUserAdmin)
