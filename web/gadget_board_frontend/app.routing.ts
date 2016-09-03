import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found.component'

const appRoutes: Routes = [
	{
		path: '',
		pathMatch: "full",
		redirectTo: 'gadgets',
	},
	{	path: 'gadgets', 
		loadChildren: './gadget/gadget.module#GadgetModule'
	},
	{	path: 'accounts', 
		loadChildren: './account/account.module#AccountModule'
	},
	{
		path: '**',
        component: PageNotFoundComponent
	}
];

export const appRoutingProviders: any[] = [

];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);