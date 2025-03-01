from django.urls import path
from . import views

urlpatterns = [
    path('categories/', views.get_categories, name='get_categories'),
    path('notes/', views.get_notes, name='get_notes'),
    path('notes/create/', views.create_note, name='create_note'),
    path('notes/update/<int:note_id>/', views.edit_note, name='edit_note'),
    path('notes/find/<int:id>/', views.get_note_by_id, name='get_note_by_id'),
]
