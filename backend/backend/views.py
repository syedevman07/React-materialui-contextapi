from rest_framework import routers, serializers, viewsets
from backend.models import MyUser, Category, SubCategory
from backend.serializers import CategorySerializer

class CategoryViewSet(viewsets.ModelViewSet):
  queryset =  Category.objects.all()
  serializer_class = CategorySerializer