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
import { UtilisateursComponent } from './Admin/utilisateurs/utilisateurs.component';
import { SaisieValeurComponent } from './Admin/capteurs/saisie-valeur/saisie-valeur.component';
import { MesuresComponent } from './Admin/mesures/mesures.component';
import { RegionsComponent } from './Admin/regions/regions.component';

import { NotificationComponent } from './Admin/mesures/notification/notification.component';
//import { DashboardrespComponent } from './Responsable/dashboardresp/dashboardresp.component';
//import { CapteursrespComponent } from './Responsable/capteursresp/capteursresp.component';
//import { DashboarduserComponent } from './User/dashboarduser/dashboarduser.component';
//import { ErreurComponent } from './erreur/erreur.component';
// import { HTTP_INTERCEPTORS } from '@angular/common/http';
// import { Interceptor } from './Authentification/Interceptor'




import {ChartService} from "./Services/chart.service";
import { MaindashboardComponent } from './Dashboard/maindashboard/maindashboard.component';
import { HighchartsChartModule } from 'highcharts-angular';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AccueilComponent,
    VillesComponent,
    CapteursComponent,
    RegionsComponent,
    UtilisateursComponent,
    SaisieValeurComponent,
    MesuresComponent,
    //DashboardrespComponent,
    //CapteursrespComponent,
    //DashboarduserComponent,
    //ErreurComponent,
    NotificationComponent,
    MaindashboardComponent,

  ],
  imports: [
    BrowserModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    HighchartsChartModule
  ],
  exports: [RouterModule],
  providers: [
    /*{
      provide: HTTP_INTERCEPTORS,
      useClass: Interceptor,
      multi: true
    }*/
    ChartService
],
  bootstrap: [AppComponent]
})
export class AppModule { }
