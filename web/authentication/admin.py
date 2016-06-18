from django.contrib import admin
from .models import Account

@admin.register(Account)
class AccountAdmin(admin.ModelAdmin):
	readonly_fields = ('created_at','updated_at',)
