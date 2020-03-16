from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager

class UserManager(BaseUserManager):
  def create_user(self, email, password=None, first_name=None, last_name=None):
    """
    Creates and saves a user with given email and password.
    """
    if not email:
        raise ValueError('User must have an email address')
    user = self.model(email=self.normalize_email(email))
    user.set_password(password)
    user.save(using=self._db)
    return user

  def create_superuser(self, email, password):
    """
    Creates and saves a superuser with the given email and password.
    """
    user = self.create_user(email=email, password=password)
    user.is_staff = True
    user.is_superuser = True
    user.save(using=self._db)
    return user

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
  country = models.CharField(max_length=100, default="")
  city = models.CharField(max_length=100, default="")
  category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True)
  sub_category = models.ForeignKey(SubCategory, on_delete=models.SET_NULL, null=True)
  role = models.CharField(max_length=6, choices=ROLE_CHOICES, default="User", help_text="Account Type")

  USERNAME_FIELD = 'email'
  REQUIRED_FIELDS = []

  objects = UserManager()

  def __str__(self):
    return f"{self.first_name} {self.last_name}"
