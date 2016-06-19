from rest_framework import serializers
from authentication.serializers import AccountSerializer
from .models import Gadget, GadgetData


class GadgetSerializer(serializers.ModelSerializer):
    users_can_upload = serializers.PrimaryKeyRelatedField(many=True, read_only=True)	
    
    class Meta:
        model = Gadget
        fields = ('id', 'name', 'description', 'users_can_upload')
        read_only_fields = ('created_at', 'updated_at')


class GadgetDataSerializer(serializers.ModelSerializer):
    gadget = serializers.PrimaryKeyRelatedField(read_only=True)
    added_by = serializers.PrimaryKeyRelatedField(read_only=True)
    data = serializers.JSONField()  # Output data rather than string

    class Meta:
        model = GadgetData
        fields = ('id', 'gadget', 'data', 'added_by', 'timestamp')
        read_only_fields = ('created_at',)