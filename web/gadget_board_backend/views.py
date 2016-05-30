from django.views.generic.base import TemplateView


class IndexView(TemplateView):
    template_name = 'index.html'

    def dispatch(self, *args, **kwargs):
        return super(IndexView, self).dispatch(*args, **kwargs)