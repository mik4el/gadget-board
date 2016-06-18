from django.contrib import admin
from .models import Gadget, GadgetData

@admin.register(Gadget)
class GadgetAdmin(admin.ModelAdmin):
	readonly_fields = ('created_at','updated_at',)

@admin.register(GadgetData)
class GadgetDataAdmin(admin.ModelAdmin):
	readonly_fields = ('created_at',)
