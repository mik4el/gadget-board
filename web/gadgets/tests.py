from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIClient
from django.utils import timezone
import json

from authentication.models import Account
from .models import Gadget, GadgetData
from .views import GadgetViewSet


class AccountTestCase(TestCase):
    def setUp(self):
        self.name = 'name1'
        self.description = 'description1'
        self.username = 'test1'
        self.password = 'password'

        # Create user
        self.test_user = Account.objects.create(
            username=self.username,
        	password=self.password
        )

        # Create gadget
        self.gadget = Gadget.objects.create(
            name=self.name, 
        	description=self.description
        )
        self.gadget.users_can_upload.add(self.test_user)

        obj={}
        obj['key1']='value1'

        # Create data for gadget
        self.gadget_data_1 = GadgetData.objects.create(
            gadget=self.gadget, 
            data=obj,
            added_by=self.test_user,
            timestamp=timezone.now()
        )
        self.gadget_data_2 = GadgetData.objects.create(
            gadget=self.gadget, 
            data=obj,
            added_by=self.test_user,
            timestamp=timezone.now()
        )
        self.gadget_data_3 = GadgetData.objects.create(
            gadget=self.gadget, 
            data=obj,
            added_by=self.test_user,
            timestamp=timezone.now()
        )

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
        self.assertEqual(response.json()[0]['users_can_upload'][0], self.test_user.id)

    def test_list_gadget_data_for_gadget(self):
        # setup
        view = GadgetViewSet.as_view({'get': 'list'})
        client = APIClient()
        # make requrest and assert ok
        response = client.get(
            '/api/v1/gadgets/'+str(self.gadget.id)+'/data/', 
            format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        # assert data in reply
        self.assertEqual(len(response.json()), 3)
        self.assertEqual(response.json()[2]['gadget'], self.gadget.id)
        self.assertEqual(response.json()[2]['data'], {'key1': 'value1'})
        
    def test_get_gadget_data_for_gadget(self):
        view = GadgetViewSet.as_view({'get': 'retrieve'})
        client = APIClient()
        # make requrest and assert ok
        response = client.get(
            '/api/v1/gadgets/'+str(self.gadget.id)+'/data/'+str(self.gadget_data_1.id)+'/', 
            format='json')
        print(response.json())
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        # assert data in reply
        self.assertEqual(response.json()['gadget'], self.gadget.id)
        self.assertEqual(response.json()['data'], {'key1': 'value1'})
        























