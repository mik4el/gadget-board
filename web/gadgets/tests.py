from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIClient

from authentication.models import Account
from .models import Gadget
from .views import GadgetViewSet


class AccountTestCase(TestCase):
    def setUp(self):
        self.name = 'name1'
        self.description = 'description1'
        self.username = 'test1'
        self.password = 'password'

        # Create user
        self.test_user = Account.objects.create(username=self.username,
        	password=self.password)

        # Create gadget
        self.gadget = Gadget.objects.create(name=self.name, 
        	description=self.description)
        self.gadget.users_can_upload.add(self.test_user)

    def test_get_gadgets(self):
        # setup
        view = GadgetViewSet.as_view({'get': 'retrieve'})
        client = APIClient()

        # make requrest and assert ok
        response = client.get('/api/v1/gadgets/', format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        # assert gadget in resposnse
        self.assertEqual(response.json()[0]['name'], self.name)
        # assert gadget users_can_upload
        self.assertEqual(response.json()[0]['users_can_upload'][0]['id'], self.test_user.id)
