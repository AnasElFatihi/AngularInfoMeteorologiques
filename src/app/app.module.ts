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
import { CapteursComponent } from './Admin/capteurs/capteurs.component';
// import { HTTP_INTERCEPTORS } from '@angular/common/http';
// import { Interceptor } from './Authentification/Interceptor'
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AccueilComponent,
    VillesComponent,
    CapteursComponent,

  ],
  imports: [
    BrowserModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  exports: [RouterModule],
  providers: [
    /*{
      provide: HTTP_INTERCEPTORS,
      useClass: Interceptor,
      multi: true
    }*/

],
  bootstrap: [AppComponent]
})
export class AppModule { }
