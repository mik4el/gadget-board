from django.views.generic.base import TemplateView


class IndexView(TemplateView):
    template_name = 'index.html'

    def dispatch(self, *args, **kwargs):
        return super(IndexView, self).dispatch(*args, **kwargs)


class UnitTestView(TemplateView):
    template_name = 'unit-tests.html'

    def dispatch(self, *args, **kwargs):
        return super(UnitTestView, self).dispatch(*args, **kwargs)