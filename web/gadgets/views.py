from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from django.shortcuts import get_object_or_404

from .models import Gadget, GadgetData
from .serializers import GadgetSerializer, GadgetDataSerializer
from .permissions import UserCanAddGadgetData


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
		return (UserCanAddGadgetData(),)

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

	def create(self, request, gadget_id=None):
		serializer = self.serializer_class(data=request.data)
		if serializer.is_valid():
			# Check Gadget for GadgetData exists
			gadget = get_object_or_404(Gadget, id=gadget_id)
			# Create GadgetData
			gadget_data = GadgetData.objects.create(
				gadget=gadget, 
				data=serializer.validated_data['data'],
				added_by=request.user,
				timestamp=serializer.validated_data['timestamp'])
			# Make response		
			serializer = self.serializer_class(gadget_data)
			return Response(serializer.data, status=status.HTTP_201_CREATED)
		return Response({
        'error': 'Gadget data could not be created with received data.'
    		}, status=status.HTTP_400_BAD_REQUEST)