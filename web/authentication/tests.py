from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIClient

from authentication.models import Account
from authentication.views import AccountViewSet


class AccountTestCase(TestCase):
    def setUp(self):
        self.username = 'test1'
        self.password = 'password'
        self.json_account_credentials = {
            'username': self.username,
            'password': self.password
        }
        self.json_new_account_data = {
            'username': self.username,
            'password': self.password,
            'email': self.username+"@example.com"
        }

    def test_create_account(self):
        # setup
        view = AccountViewSet.as_view({'post': 'create'})
        client = APIClient()

        # auth with jwt
        response = client.post('/api/v1/accounts/',
                               self.json_new_account_data,
                               format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        account = Account.objects.get(username=self.username)
        self.assertIsNotNone(account)

    def test_assert_is_active(self):
        """
        Accounts are automatically is_active=true
        :return:
        """
        self.test_create_account()
        account = Account.objects.get(username=self.username)
        self.assertEqual(account.is_active, True)


    def test_only_me_can_delete_account(self):
        """
        Accounts can only be deleted by authed owner
        :return:
        """
        # setup
        self.test_create_account()
        view = AccountViewSet.as_view({'delete': 'destroy'})
        account = Account.objects.get(username=self.username)
        client = APIClient()

        # auth with jwt
        response = client.post('/api-token-auth/',
                               self.json_account_credentials,
                               format='json')

        token = response.data['token']
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # Make request
        client.credentials(HTTP_AUTHORIZATION='Bearer ' + token)
        #client.force_authenticate(user=account)
        response = client.delete('/api/v1/accounts/'+self.username+'/')
        # Asserts
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        # check no object exists
        try:
            account = Account.objects.get(username=self.username)
        except:
            account = None
        self.assertIsNone(account)
