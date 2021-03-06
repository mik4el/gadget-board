from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIClient
from django.utils import timezone
import json

from authentication.models import Account
from .models import Gadget, GadgetData
from .views import GadgetViewSet


class GadgetsTestCase(TestCase):
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

        # Create user 2
        self.test_user_2 = Account.objects.create(
            username="test2",
            password=self.password
        )

        # Create gadget
        self.gadget = Gadget.objects.create(
            name=self.name,
            description=self.description,
            image_name=self.name
        )
        self.gadget.users_can_upload.add(self.test_user)

        self.data_obj_1 = {}
        self.data_obj_1['key1'] = 'value1'
        self.data_obj_2 = {}
        self.data_obj_2['key2'] = 'value2'
        self.data_obj_3 = {}
        self.data_obj_3['key3'] = 'value3'

        # Create data for gadget
        self.gadget_data_1 = GadgetData.objects.create(
            gadget=self.gadget,
            data=self.data_obj_1,
            added_by=self.test_user,
            timestamp=timezone.now()
        )
        self.gadget_data_2 = GadgetData.objects.create(
            gadget=self.gadget,
            data=self.data_obj_2,
            added_by=self.test_user,
            timestamp=timezone.now()
        )
        self.gadget_data_3 = GadgetData.objects.create(
            gadget=self.gadget,
            data=self.data_obj_3,
            added_by=self.test_user,
            timestamp=timezone.now()
        )
        self.json_account_credentials = {
            'username': self.username,
            'password': self.password
        }

    def test_get_gadgets(self):
        # setup
        view = GadgetViewSet.as_view({'get': 'retrieve'})
        client = APIClient()
        # make requrest and assert ok
        response = client.get('/backend/api/v1/gadgets/', format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        # assert data in resposnse
        self.assertEqual(response.json()[0]['name'], self.gadget.name)
        self.assertEqual(response.json()[0]['image_url'], "backend/static/media/" + self.gadget.name)
        self.assertEqual(response.json()[0]['users_can_upload'][0], self.test_user.id)
        self.assertEqual(response.json()[0]['slug'], self.gadget.slug)

    def test_list_gadget_data_for_gadget(self):
        # setup
        view = GadgetViewSet.as_view({'get': 'list'})
        client = APIClient()
        # make requrest and assert ok
        response = client.get(
            '/backend/api/v1/gadgets/' + str(self.gadget.slug) + '/data/',
            format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        # assert data in reply
        self.assertEqual(len(response.json()), 1)
        self.assertEqual(response.json()[0]['data'], self.data_obj_3)

    def test_get_gadget_data_for_gadget(self):
        view = GadgetViewSet.as_view({'get': 'retrieve'})
        client = APIClient()
        # make requrest and assert ok
        response = client.get(
            '/backend/api/v1/gadgets/' + str(self.gadget.slug) + '/data/' + str(self.gadget_data_1.id) + '/',
            format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        # assert data in reply
        self.assertEqual(response.json()['data'], self.data_obj_1)

    def test_post_gadget_data_for_gadget(self):
        view = GadgetViewSet.as_view({'post': 'create'})
        client = APIClient()
        gadget_json_data = {}
        gadget_json_data = {}
        gadget_json_data['gadget'] = self.gadget.slug
        gadget_json_data['data'] = self.data_obj_1
        gadget_json_data['timestamp'] = str(timezone.now())

        # Make request without authentication
        response = client.post(
            '/backend/api/v1/gadgets/' + str(self.gadget.slug) + '/data/',
            gadget_json_data,
            format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

        # Make request with authentication but user not in user_can_upload
        client.force_authenticate(user=self.test_user_2)
        response = client.post(
            '/backend/api/v1/gadgets/' + str(self.gadget.slug) + '/data/',
            gadget_json_data,
            format='json')
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

        # Make request with authentication but user in user_can_upload
        client.force_authenticate(user=self.test_user)
        response = client.post(
            '/backend/api/v1/gadgets/' + str(self.gadget.slug) + '/data/',
            gadget_json_data,
            format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        # assert data in reply
        self.assertEqual(response.json()['data'], {'key1': 'value1'})

        # Make request without timestamp
        gadget_json_data = json.loads(
            '{"data":{"ssid":"OWNIT_74"}}'
        )
        client.force_authenticate(user=self.test_user)
        response = client.post(
            '/backend/api/v1/gadgets/' + str(self.gadget.slug) + '/data/',
            gadget_json_data,
            format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_remove_user_in_user_can_upload(self):
        self.gadget.users_can_upload.add(self.test_user_2)
        self.test_user_2.delete()
        self.assertEqual(len(self.gadget.users_can_upload.all()), 1)
