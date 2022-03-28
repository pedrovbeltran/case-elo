import { NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CdTimerModule } from 'angular-cd-timer';

import { AppComponent } from './app.component';
import { LeadsComponent } from './leads/leads.component';
import { TopbarComponent } from './_components/topbar/topbar.component';
import { NewleadComponent } from './newlead/newlead.component';
import { LoginComponent } from './login/login.component';

import { AppRoutingModule } from './app-routing.module';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DragDropModule,
    CdTimerModule,
  ],
  declarations: [
    AppComponent,
    LeadsComponent,
    TopbarComponent,
    NewleadComponent,
    LoginComponent,
  ],
  providers: [Title],
  bootstrap: [AppComponent],
})
export class AppModule {}
