from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager

class UserManager(BaseUserManager):
  pass

class Category(models.Model):
  name = models.CharField(max_length=100)
  def __str__(self):
    return self.name


class SubCategory(models.Model):
  name = models.CharField(max_length=100)
  category = models.ForeignKey(Category, max_length=100, on_delete=models.CASCADE)

  def __str__(self):
    return name


class User(AbstractUser):

  ROLE_CHOICES = (
    ('Admin', 'Admin'),
    ('User', 'User'),
  )

  email = models.EmailField(unique=True)
  first_name = models.CharField(max_length=100)
  last_name = models.CharField(max_length=100)
  country = models.CharField(max_length=100)
  city = models.CharField(max_length=100)
  sub_category = models.ForeignKey(SubCategory, on_delete=models.PROTECT)
  role = models.CharField(max_length=6, choices=ROLE_CHOICES, default="User", help_text="Account Type")

  USERNAME_FIELD = 'email'
  REQUIRED_FIELDS = []

  objects = UserManager()

  def __str__(self):
    return f"{self.first_name} {self.last_name}"

  