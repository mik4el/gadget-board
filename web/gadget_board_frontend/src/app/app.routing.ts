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
		loadChildren: () => import('./gadget/gadget.module').then(m => m.GadgetModule)
	},
	{	path: 'accounts',
		loadChildren: () => import('./account/account.module').then(m => m.AccountModule)
	},
	{
		path: '**',
        component: PageNotFoundComponent
	}
];

export const appRoutingProviders: any[] = [

];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);