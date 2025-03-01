from django.db import models
from users.models import CustomUser  # Import your custom user model

class Category(models.Model):
    name = models.CharField(max_length=100)
    color = models.CharField(max_length=7)  # Example: "#FF5733" for color hex

    def __str__(self):
        return self.name

class Note(models.Model):
    title = models.CharField(max_length=255)
    content = models.TextField()
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True, related_name='notes')
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='notes')
    createdAt = models.DateTimeField(auto_now_add=True)
    lastUpdatedAt = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title
