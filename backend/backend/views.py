from rest_framework import routers, serializers, viewsets, generics
from backend.models import MyUser, Category, SubCategory
from backend.serializers import PasswordSerializer, SignupSerializer, CategorySerializer, SubCategoryRetrieveSerializer, SubCategoryUpdateSerializer, MyUserRetrieveSerializer, MyUserUpdateSerializer
from backend.permissions import AdminOnly, ReadOnly, AllowPost
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

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
  permission_classes = [AdminOnly|ReadOnly]
  queryset = MyUser.objects.all()

  def get_serializer_class(self):
    if self.action == 'list' or self.action == 'retrieve':
      return MyUserRetrieveSerializer
    else:
      return MyUserUpdateSerializer
  
  # @action(detail=True, methods=['post'])
  # def set_password(self, request, pk=None)
  #   user = self.get_object()
  #   serializer = PasswordSerializer(data=request.data)
  #   if serializer.is_valid():
  #     user.set_password(serializers.data['password'])
  #     user.save()
  #     return Response

class SignupView(generics.CreateAPIView):
  serializer_class = SignupSerializer
  permission_classes = [AllowAny,]