from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from notes.models import Category, Note
from notes.serializers import NoteSerializer, CategorySerializer
from django.db import models

# Define query parameters for filtering notes
category_id_param = openapi.Parameter('categoryId', openapi.IN_QUERY, description="Category ID to filter notes", type=openapi.TYPE_INTEGER)

# GET /categories - Get all categories plus the number of notes for each category
@swagger_auto_schema(
    method="GET",
    responses={200: CategorySerializer(many=True)},
    operation_description="Retrieve all categories with the number of notes for each category.",
)
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_categories(request):
    categories = Category.objects.all()
    # Annotate category with the number of notes for each category
    categories_with_count = categories.annotate(note_count=models.Count('notes'))
    serializer = CategorySerializer(categories_with_count, many=True, context={'request': request})
    return Response(serializer.data)

# GET /notes - Get all notes from newest to oldest with optional categoryId filter
@swagger_auto_schema(
    method="GET",
    manual_parameters=[category_id_param],
    responses={200: NoteSerializer(many=True)},
    operation_description="Get all notes, optionally filtered by category.",
)
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_notes(request):
    user = request.user
    category_id = request.query_params.get('categoryId', None)
    
    notes = Note.objects.filter(user=user)
    if category_id:
        notes = notes.filter(category_id=category_id)

    notes = notes.order_by('-createdAt')  # Sort by newest first
    serializer = NoteSerializer(notes, many=True, context={'request': request})
    return Response(serializer.data)

# POST /notes - Create a new note with default title, content, and category
@swagger_auto_schema(
    method="POST",
    request_body=NoteSerializer,
    responses={201: NoteSerializer()},
    operation_description="Create a new note with default values for title, content, and category.",
)
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_note(request):
    user = request.user
    title = "Note Title"
    content = "Pour your heart out..."
    category = Category.objects.first()  # Default category, assuming a category exists
    
    note = Note.objects.create(
        title=title,
        content=content,
        category=category,
        user=user
    )
    serializer = NoteSerializer(note)
    return Response(serializer.data, status=status.HTTP_201_CREATED)

# POST /notes/:id - Edit an existing note by its ID
@swagger_auto_schema(
    method="POST",
    request_body=NoteSerializer,
    responses={200: NoteSerializer()},
    operation_description="Edit an existing note by its ID, including title, content, and category. Last updated time will be modified.",
)
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def edit_note(request, note_id):
    try:
        note = Note.objects.get(id=note_id, user=request.user)
    except Note.DoesNotExist:
        return Response({"detail": "Note not found."}, status=status.HTTP_404_NOT_FOUND)

    title = request.data.get('title', note.title)
    content = request.data.get('content', note.content)
    category_id = request.data.get('category', None)

    if category_id:
        category = Category.objects.get(id=category_id)
        note.category = category

    note.title = title
    note.content = content
    note.save()

    serializer = NoteSerializer(note)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_note_by_id(request, id):
    try:
        note = Note.objects.get(id=id)
    except Note.DoesNotExist:
        raise NotFound(detail="Note not found")

    serializer = NoteSerializer(note, context={'request': request})
    
    return Response(serializer.data)
