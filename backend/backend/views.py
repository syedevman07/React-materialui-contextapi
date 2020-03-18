from rest_framework import routers, serializers, viewsets, generics
from backend.models import MyUser, Category, SubCategory
from backend.serializers import SignupSerializer, CategorySerializer, SubCategoryRetrieveSerializer, SubCategoryUpdateSerializer, MyUserRetrieveSerializer, MyUserUpdateSerializer
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


class MyUserViewSet(viewsets.ModelViewSet):
  permission_classes = [AllowAny]
  queryset = MyUser.objects.all()
  def get_serializer_class(self):
    if self.action == 'list':
      return MyUserRetrieveSerializer
    else:
      return MyUserUpdateSerializer

class SignupView(generics.CreateAPIView):
  serializer_class = SignupSerializer
  permission_classes = [AllowAny, ]