from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.db import models
from django.contrib.auth.models import BaseUserManager


class AccountManager(BaseUserManager):
    def create_account(self, username, password, **kwargs):
        if not username:
            raise ValueError('Users must have a valid username')

        if not password:
            raise ValueError('Users must have a valid password.')

        if not kwargs.get('email'):
            raise ValueError('Users must have a valid email.')

        account = self.model(
            username=username, email=self.normalize_email(kwargs.get('email'))
        )

        account.is_active = True

        account.set_password(password)
        account.save()

        return account

    def create_superuser(self, username, password, **kwargs):
        account = self.create_account(username, password, **kwargs)

        account.is_superuser = True

        account.save()

        return account


class Account(AbstractBaseUser, PermissionsMixin):
    username = models.CharField(max_length=40, unique=True)
    email = models.EmailField()  # users can share email

    is_gadget = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    objects = AccountManager()

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['email']

    def __str__(self):
        return self.username

    def get_full_name(self):
        return self.username

    def get_short_name(self):
        return self.username

    @property
    def is_staff(self):
        "Is the user a member of staff?"
        return self.is_superuser