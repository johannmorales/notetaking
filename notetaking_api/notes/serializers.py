from rest_framework import serializers
from .models import Category, Note

class CategorySerializer(serializers.ModelSerializer):
    note_count = serializers.SerializerMethodField()

    class Meta:
        model = Category
        fields = ['id', 'name', 'color', 'note_count']

    def get_note_count(self, obj):
        user = self.context.get('request').user
        return obj.notes.filter(user=user).count()



class NoteCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'color']


class NoteSerializer(serializers.ModelSerializer):
    category = NoteCategorySerializer(read_only=True)  # Nested Category serializer
    class Meta:
        model = Note
        fields = ['id', 'title', 'content', 'category', 'user', 'createdAt', 'lastUpdatedAt']
        read_only_fields = ['user', 'createdAt', 'lastUpdatedAt']
