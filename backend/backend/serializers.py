from rest_framework import routers, serializers, viewsets
from backend.models import MyUser, Category


class CategorySerializer(serializers.ModelSerializer):
  class Meta:
    model = Category
    fields = ['id', 'name']