# -*- coding: utf-8 -*-
# Generated by Django 1.9.6 on 2016-07-01 07:57
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('gadgets', '0004_gadgetdata_timestamp'),
    ]

    operations = [
        migrations.AddField(
            model_name='gadget',
            name='slug',
            field=models.SlugField(blank=True, null=True),
        ),
    ]
