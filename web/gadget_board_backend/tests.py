from django.test import TestCase
from django.conf import settings


class UnitTestViewTestCase(TestCase):

    def test_view_when_debug(self):
        settings.DEBUG = True
        response = self.client.get('/unit-tests.html')
        self.assertEqual(response.status_code, 200)

    def test_view_when_not_debug(self):
        settings.DEBUG = False
        response = self.client.get('/unit-tests.html')
        self.assertEqual(response.status_code, 403)
