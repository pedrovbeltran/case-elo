import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { LeadsComponent } from './leads/leads.component';
import { NewleadComponent } from './newlead/newlead.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'leads',
    component: LeadsComponent,
  },
  {
    path: 'newlead',
    component: NewleadComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
