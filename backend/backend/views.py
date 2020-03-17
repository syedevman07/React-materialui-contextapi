from rest_framework import routers, serializers, viewsets
from backend.models import MyUser, Category, SubCategory
from backend.serializers import CategorySerializer, SubCategoryRetrieveSerializer, SubCategoryUpdateSerializer
from backend.permissions import AdminOnly, ReadOnly

from rest_framework.permissions import AllowAny

class CategoryViewSet(viewsets.ModelViewSet):
  permission_classes = [AdminOnly | ReadOnly]
  queryset =  Category.objects.all()
  serializer_class = CategorySerializer

class SubCategoryViewSet(viewsets.ModelViewSet):
  permission_classes = [AdminOnly | ReadOnly]

  def get_serializer_class(self):
    if self.action == 'list':
      return SubCategoryRetrieveSerializer
    else:
      return SubCategoryUpdateSerializer

  queryset =  SubCategory.objects.all()