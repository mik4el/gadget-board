from rest_framework import viewsets, permissions

from .models import Gadget
from .serializers import GadgetSerializer


class GadgetViewSet(viewsets.ReadOnlyModelViewSet):
    lookup_field = 'id'
    queryset = Gadget.objects.all()
    serializer_class = GadgetSerializer

    def get_permissions(self):
        if self.request.method in permissions.SAFE_METHODS:
            return (permissions.AllowAny(),)