from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from rest_framework.pagination import LimitOffsetPagination
from django.shortcuts import get_object_or_404

from .models import Gadget, GadgetData
from .serializers import GadgetSerializer, GadgetDataSerializer
from .permissions import CanUserAddGadgetData


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
	pagination_class = LimitOffsetPagination

	def get_permissions(self):
		return (CanUserAddGadgetData(),)

	def list(self, request, gadget_id=None):
		queryset = GadgetData.objects.filter(gadget=gadget_id).order_by('-timestamp')
		
		page = self.paginate_queryset(queryset)
		if page is not None:
			serializer = GadgetDataSerializer(page, many=True)
			return self.get_paginated_response(serializer.data)

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

	@property
	def paginator(self):
		"""
		The paginator instance associated with the view, or `None`.
		"""
		if not hasattr(self, '_paginator'):
			if self.pagination_class is None:
				self._paginator = None
			else:
				self._paginator = self.pagination_class()
		return self._paginator

	def paginate_queryset(self, queryset):
		"""
		Return a single page of results, or `None` if pagination is disabled.
		"""
		if self.paginator is None:
			return None
		return self.paginator.paginate_queryset(queryset, self.request, view=self)

	def get_paginated_response(self, data):
		"""
		Return a paginated style `Response` object for the given output data.
		"""
		assert self.paginator is not None
		return self.paginator.get_paginated_response(data)






