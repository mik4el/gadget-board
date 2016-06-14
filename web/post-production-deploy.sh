#!/bin/sh
python manage.py collectstatic --noinput
/usr/local/bin/gunicorn gadget_board_backend.wsgi:application -w 2 -b :8000