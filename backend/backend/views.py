from rest_framework import routers, serializers, viewsets, generics
from rest_framework.decorators import action
from backend.models import MyUser, Category, SubCategory, ADMIN_USER, REGULAR_USER
from backend.serializers import PasswordSerializer, SignupSerializer, CategorySerializer, SubCategoryRetrieveSerializer, SubCategoryUpdateSerializer, MyUserRetrieveSerializer, MyUserUpdateSerializer
from backend.permissions import AdminOnly, ReadOnly, AllowPost
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters

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
  permission_classes = [AdminOnly|ReadOnly|AllowAny]
  queryset = MyUser.objects.all()
  filter_backends = [DjangoFilterBackend, filters.SearchFilter]
  filterset_fields = ['sub_category', 'role']
  search_fields = ['first_name', 'last_name', 'email', 'country', 'city']

  def get_queryset(self):
    try:
      if self.request.user.role == ADMIN_USER:
        return MyUser.objects.all()
    except:
      pass
    return MyUser.objects.filter(role=REGULAR_USER)

  def get_serializer_class(self):
    if self.action == 'list' or self.action == 'retrieve':
      return MyUserRetrieveSerializer
    elif self.action == 'set_password':
      return PasswordSerializer
    else:
      return MyUserUpdateSerializer
  
  @action(detail=True, methods=['post'])
  def set_password(self, request, pk=None):
    user = self.get_object()
    serializer_class = self.get_serializer_class()
    serializer = serializer_class(data=request.data)
    if serializer.is_valid(raise_exception=True):
      user.set_password(serializer.data['password'])
      user.save()
      return Response({'status': 'password set'})
    else:
      return Response(serializer.errors,
        status=status.HTTP_400_BAD_REQUEST)

class SignupView(generics.CreateAPIView):
  serializer_class = SignupSerializer
  permission_classes = [AllowAny,]


class ProfileViewSet(viewsets.ModelViewSet):
  permission_classes = [IsAuthenticated, ]
  serializer_class = MyUserUpdateSerializer

  def get(self, request, *args, **kwargs):
    serializer = MyUserRetrieveSerializer(request.user)
    return Response(serializer.data)

  def partial_update(self, request, *args, **kwargs):
    instance = request.user
    serializer = self.serializer_class(instance, data=request.data, partial=True)
    serializer.is_valid(raise_exception=True)
    serializer.save()
    return Response(serializer.data)
  
  @action(detail=False, methods=['post'])
  def set_password(self, request, pk=None):
    user = request.user
    serializer_class = self.get_serializer_class()
    serializer = serializer_class(data=request.data)
    if serializer.is_valid(raise_exception=True):
      user.set_password(serializer.data['password'])
      user.save()
      return Response({'status': 'password set'})
    else:
      return Response(serializer.errors,
        status=status.HTTP_400_BAD_REQUEST)