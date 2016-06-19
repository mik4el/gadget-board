from rest_framework import viewsets, permissions
from rest_framework.response import Response
from django.shortcuts import get_object_or_404

from .models import Gadget, GadgetData
from .serializers import GadgetSerializer, GadgetDataSerializer


class GadgetViewSet(viewsets.ReadOnlyModelViewSet):
    lookup_field = 'id'
    queryset = Gadget.objects.all()
    serializer_class = GadgetSerializer

    def get_permissions(self):
        if self.request.method in permissions.SAFE_METHODS:
            return (permissions.AllowAny(),)


class GadgetDataViewSet(viewsets.ViewSet):
    lookup_field = 'id'
    serializer_class = GadgetDataSerializer

    def get_permissions(self):
        if self.request.method in permissions.SAFE_METHODS:
            return (permissions.AllowAny(),)

    def list(self, request, gadget_id=None):
        queryset = GadgetData.objects.filter(gadget=gadget_id)
        serializer = GadgetDataSerializer(queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, id=None, gadget_id=None):
        queryset = GadgetData.objects.filter(id=id, 
        	gadget=gadget_id)
        gadget_data = get_object_or_404(queryset, id=id)
        serializer = GadgetDataSerializer(gadget_data)
        return Response(serializer.data)
