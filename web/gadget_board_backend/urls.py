from django.conf.urls import url, include
from django.contrib import admin
from rest_framework_nested import routers
from rest_framework_jwt.views import obtain_jwt_token
from rest_framework_jwt.views import refresh_jwt_token

from authentication.views import AccountViewSet
from gadget_board_backend.views import IndexView, UnitTestView
from gadgets.views import GadgetViewSet

router = routers.SimpleRouter()
router.register(r'accounts', AccountViewSet)
router.register(r'gadgets', GadgetViewSet)

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    url(r'^api-token-auth/', obtain_jwt_token),
    url(r'^api-token-refresh/', refresh_jwt_token),
    url(r'^api/v1/', include(router.urls)),
    url(r'^unit-tests.html', UnitTestView.as_view(), name='unit-tests'),  # TODO: only available in debug mode!
    url('^.*$', IndexView.as_view(), name='index'),
]