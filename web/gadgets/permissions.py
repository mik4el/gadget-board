from rest_framework import permissions
from django.shortcuts import get_object_or_404
from .models import Gadget


class CanUserAddGadgetData(permissions.BasePermission):
	def has_permission(self, request, view):
		if request.method in permissions.SAFE_METHODS:
			return True
		if request.method == "POST":
			if request.user.is_authenticated():
				gadget = get_object_or_404(Gadget, id=view.kwargs['gadget_id'])
				if request.user in gadget.users_can_upload.all():
					return True
		return False

	def has_object_permission(self, request, view, obj):
		return False