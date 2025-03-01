from django.contrib import admin
from .models import Category, Note

# Register the Category model
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'color')  # Add other fields you want to display in the list view
    search_fields = ('name',)  # Allow searching by category name

# Register the Note model
class NoteAdmin(admin.ModelAdmin):
    list_display = ('title', 'category', 'user', 'createdAt', 'lastUpdatedAt')
    search_fields = ('title', 'content')  # Search by title or content
    list_filter = ('category', 'user')  # Filter notes by category and user

# Register both models with the custom admin views
admin.site.register(Category, CategoryAdmin)
admin.site.register(Note, NoteAdmin)
