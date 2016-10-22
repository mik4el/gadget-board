#!/bin/sh
/usr/local/bin/gunicorn gadget_board_backend.wsgi:application -w 3 -b :8000