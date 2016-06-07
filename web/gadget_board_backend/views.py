from django.views.generic.base import TemplateView
from django.conf import settings
from django.http import HttpResponseForbidden


class IndexView(TemplateView):
    template_name = 'index.html'

    def dispatch(self, *args, **kwargs):
        return super(IndexView, self).dispatch(*args, **kwargs)


class UnitTestView(TemplateView):
    template_name = 'unit-tests.html'

    def dispatch(self, *args, **kwargs):
        if settings.DEBUG:
            return super(UnitTestView, self).dispatch(*args, **kwargs)
        else:
            return HttpResponseForbidden()