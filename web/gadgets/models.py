from django.db import models
from django.contrib.postgres.fields import JSONField
from django.template.defaultfilters import slugify
from authentication.models import Account


class Gadget(models.Model):
    name = models.CharField(max_length=40, unique=True)
    slug = models.SlugField(null=True, blank=True)
    description = models.TextField()
    users_can_upload = models.ManyToManyField(Account)
    image_name = models.CharField(max_length=140, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    @property
    def image_url(self):
        if self.image_name != "":
            return "backend/static/media/{}".format(self.image_name)
        else:
            return "backend/static/dashboard_icon_big.png"

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        if not self.id:
            self.slug = slugify(self.name)

        super(Gadget, self).save(*args, **kwargs)


class GadgetData(models.Model):
    gadget = models.ForeignKey(Gadget, db_index=True, on_delete=models.DO_NOTHING)  # Add index on filtered fields
    data = JSONField()
    added_by = models.ForeignKey(Account, on_delete=models.DO_NOTHING)
    timestamp = models.DateTimeField(null=True, blank=True, db_index=True)  # Add index on filtered fields
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return '{} {} {}'.format(self.gadget, self.timestamp, self.added_by)
