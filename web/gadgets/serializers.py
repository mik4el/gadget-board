from rest_framework import serializers
from authentication.serializers import AccountSerializer
from .models import Gadget

class GadgetSerializer(serializers.ModelSerializer):
    users_can_upload = AccountSerializer(many=True, read_only=True)	
    class Meta:
        model = Gadget
        fields = ('id', 'name', 'description', 'users_can_upload')
        read_only_fields = ('created_at', 'updated_at')