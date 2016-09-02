import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GadgetListComponent } from './gadget-list.component';
import { GadgetDetailComponent } from './gadget-detail.component';


export const routing: ModuleWithProviders = RouterModule.forChild([
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
]);