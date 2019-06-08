from django.conf.urls import url, include
from django.contrib import admin
from rest_framework_nested import routers
from rest_framework_jwt.views import obtain_jwt_token
from rest_framework_jwt.views import refresh_jwt_token

from authentication.views import AccountViewSet
from gadgets.views import GadgetViewSet, GadgetDataViewSet

router = routers.SimpleRouter()
router.register(r'accounts', AccountViewSet)
router.register(r'gadgets', GadgetViewSet)
gadgets_router = routers.NestedSimpleRouter(router, r'gadgets', lookup='gadget')
gadgets_router.register(r'data', GadgetDataViewSet, base_name='gadgets-data')

def trigger_error(request):
    division_by_zero = 1 / 0

urlpatterns = [
    url(r'^backend/sentry-debug/', trigger_error),
    url(r'^backend/admin/', admin.site.urls),
    url(r'^backend/api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    url(r'^backend/api-token-auth/', obtain_jwt_token),
    url(r'^backend/api-token-refresh/', refresh_jwt_token),
    url(r'^backend/api/v1/', include(router.urls)),
    url(r'^backend/api/v1/', include(gadgets_router.urls)),
]