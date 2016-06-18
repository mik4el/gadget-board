from django.db import models
from django.contrib.postgres.fields import JSONField
from authentication.models import Account

class Gadget(models.Model):
	name = models.CharField(max_length=40, unique=True)
	description = models.TextField()
	users_can_upload = models.ManyToManyField(Account)
	created_at = models.DateTimeField(auto_now_add=True)
	updated_at = models.DateTimeField(auto_now=True)

	def __str__(self):
		return self.name


class GadgetData(models.Model):
	gadget = models.ForeignKey(Gadget)
	data = JSONField()
	added_by = models.ForeignKey(Account)
	timestamp = models.DateTimeField()
	created_at = models.DateTimeField(auto_now_add=True)

	def __str__(self):
		return '{} {}'.format(self.added_by, self.timestamp)