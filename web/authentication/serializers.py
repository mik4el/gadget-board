from rest_framework import serializers
from authentication.models import Account


class AccountSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=False)

    class Meta:
        model = Account
        fields = ('id', 'username', 'email', 'created_at', 'updated_at', 'password',)
        read_only_fields = ('created_at', 'updated_at',)