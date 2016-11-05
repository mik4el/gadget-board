from rest_framework import serializers
from authentication.serializers import AccountSerializer
from authentication.models import Account
from .models import Gadget, GadgetData


class GadgetSerializer(serializers.ModelSerializer):
    users_can_upload = serializers.PrimaryKeyRelatedField(
        many=True, read_only=True)

    class Meta:
        model = Gadget
        fields = ('id', 'name', 'description', 'users_can_upload', 'slug', 'image_url')
        read_only_fields = ('slug', 'created_at', 'updated_at')


class GadgetDataSerializer(serializers.ModelSerializer):
    data = serializers.JSONField()  # Output data rather than string

    class Meta:
        model = GadgetData
        fields = (
            'id',
            'created_at',
            'data',
            'timestamp',
        )
        read_only_fields = (
            'id',
            'created_at'
        )
