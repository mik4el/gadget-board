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
    gadget = serializers.SlugRelatedField(
        slug_field='slug',
        read_only=True)
    added_by = serializers.SlugRelatedField(
        slug_field='username',
        read_only=True)
    data = serializers.JSONField()  # Output data rather than string

    class Meta:
        model = GadgetData
        fields = (
            'id',
            'created_at',
            'data',
            'timestamp',
            'added_by',
            'gadget'
        )
        read_only_fields = (
            'id',
            'created_at'
        )
