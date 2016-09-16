import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AccountService } from './account.service';
import { AccountCreateComponent } from './account-create.component';
import { AccountLoginComponent } from './account-login.component';
import { AccountDetailComponent } from './account-detail.component';
import { AccountListComponent } from './account-list.component';
import { AccountGuard } from './account-guard';
import { routing } from './account.routing';


@NgModule({
  imports:		[ 	CommonModule, 
  					FormsModule,
  					HttpModule, 
  					routing ],
  declarations: [ 	AccountListComponent, 
  					AccountDetailComponent, 
  					AccountLoginComponent, 
  					AccountCreateComponent ],
  providers:    [ 	AccountService,
  					AccountGuard ]
})
export class AccountModule { }