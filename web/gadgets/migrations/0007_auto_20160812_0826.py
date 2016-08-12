# -*- coding: utf-8 -*-
# Generated by Django 1.9.6 on 2016-08-12 08:26
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('gadgets', '0006_auto_20160812_0824'),
    ]

    operations = [
        migrations.AddField(
            model_name='gadget',
            name='image_name',
            field=models.CharField(blank=True, max_length=140),
        ),
        migrations.AlterField(
            model_name='gadget',
            name='name',
            field=models.CharField(max_length=40, unique=True),
        ),
    ]
