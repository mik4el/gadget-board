import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccountCreateComponent } from './account-create.component';
import { AccountLoginComponent } from './account-login.component';
import { AccountDetailComponent } from './account-detail.component';
import { AccountListComponent } from './account-list.component';


export const routing: ModuleWithProviders = RouterModule.forChild([
	{
        path: 'accounts/detail/:username',
        component: AccountDetailComponent
    },
    {
        path: 'accounts/create',
        component: AccountCreateComponent
    },
    {
        path: 'accounts',
        component: AccountListComponent
    },
    {
        path: 'accounts/login',
        component: AccountLoginComponent
    }
]);