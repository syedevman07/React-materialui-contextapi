from rest_framework import routers, serializers, viewsets
from backend.models import MyUser, Category, SubCategory, Enquirery
from django.shortcuts import get_object_or_404

class CategorySerializer(serializers.ModelSerializer):
  class Meta:
    model = Category
    fields = ['id', 'name']

class SubCategorySimpleSerializer(serializers.ModelSerializer):

  class Meta:
    model = SubCategory
    fields = ['id', 'name',]

class SubCategoryRetrieveSerializer(serializers.ModelSerializer):
  category = CategorySerializer(many=False)

  class Meta:
    model = SubCategory
    fields = ['id', 'name', 'category']

class SubCategoryUpdateSerializer(serializers.ModelSerializer):
  category = serializers.PrimaryKeyRelatedField(queryset=Category.objects.all(), required=False)

  class Meta:
    model = SubCategory
    fields = ['id', 'name', 'category']


class EnquirerySerializer(serializers.ModelSerializer):

  class Meta:
    model = Enquirery
    fields = ['id', 'content']

class EnquireryCreateSerializer(serializers.ModelSerializer):

  class Meta:
    model = Enquirery
    fields = ['id', 'content', 'owner']

class MyUserRetrieveSerializer(serializers.ModelSerializer):
  sub_category = SubCategorySimpleSerializer(many=False)
  category = CategorySerializer(many=False)

  class Meta:
    model = MyUser
    fields = ['id', 'email', 'first_name', 'last_name', 'country', 'city', 'role', 'category', 'sub_category']

class MyUserDetailSerializer(serializers.ModelSerializer):
  sub_category = SubCategorySimpleSerializer(many=False)
  category = CategorySerializer(many=False)
  enquiries = EnquirerySerializer(many=True, read_only=True)
  class Meta:
    model = MyUser
    fields = ['id', 'email', 'first_name', 'last_name', 'country', 'city', 'role', 'category', 'sub_category', 'enquiries']


class MyUserUpdateSerializer(serializers.ModelSerializer):
  sub_category = serializers.PrimaryKeyRelatedField(queryset=SubCategory.objects.all(), required=False)

  class Meta:
    model = MyUser
    fields = ['id', 'email', 'password', 'first_name', 'last_name', 'country', 'city', 'role', 'category', 'sub_category']
    extra_kwargs = {'password': {'write_only': True}}

  def create(self, validated_data):
    user = MyUser(**validated_data)
    user.set_password(validated_data['password'])
    user.save()
    return user

  def to_representation(self, instance):
    serializer = MyUserRetrieveSerializer(instance)
    return serializer.data

class SignupSerializer(MyUserUpdateSerializer):

  class Meta:
    model = MyUser
    fields = ['id', 'email', 'password', 'first_name', 'last_name', 'country', 'city', 'sub_category']
    extra_kwargs = {'password': {'write_only': True}}

class PasswordSerializer(serializers.Serializer):
  password = serializers.CharField(min_length=6, allow_blank=False)

  class Meta:
    fields = ['password', ]