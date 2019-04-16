import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';


import {  RouterModule } from '@angular/router';
import { LoginComponent } from './Authentification/login/login.component';
import {FormsModule} from '@angular/forms';
import {AppRoutingModule} from './app-routing/app-routing.module';

import { HttpClientModule } from '@angular/common/http';
import { AccueilComponent } from './Dashboard/accueil/accueil.component';
import { VillesComponent } from './Admin/villes/villes.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AccueilComponent,
    VillesComponent,

  ],
  imports: [
    BrowserModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  exports: [RouterModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
