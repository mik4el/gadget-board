import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccountCreateComponent } from './account/account-create.component';
import { AccountLoginComponent } from './account/account-login.component';
import { AccountListComponent } from './account/account-list.component';
import { AccountDetailComponent } from './account/account-detail.component';
import { GadgetListComponent } from './gadget/gadget-list.component';
import { GadgetDetailComponent } from './gadget/gadget-detail.component';

const appRoutes: Routes = [
	{
		path: '',
		pathMatch: "full",
		redirectTo: 'gadgets',
	},
	{
		path: 'gadgets',
		component: GadgetListComponent,
	},
	{
        path: 'gadgets/:gadget_slug',
        component: GadgetDetailComponent
    },
    {
        path: 'gadgets/:gadget_slug/:mode',
        component: GadgetDetailComponent
    },
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
	}/*,
	{
		path: '**',
		redirectTo: 'gadgets',
	}*/
];

export const appRoutingProviders: any[] = [

];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);