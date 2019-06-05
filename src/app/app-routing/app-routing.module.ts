import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent} from '../Authentification/login/login.component';
import {AccueilComponent} from '../Dashboard/accueil/accueil.component';
import { AuthGuardService as AuthGuard} from  '../Authentification/Guards/auth-guard.service';
import {VillesComponent} from '../Admin/villes/villes.component';
import {CapteursComponent} from '../Admin/capteurs/capteurs.component';
import {UtilisateursComponent} from "../Admin/utilisateurs/utilisateurs.component";
import {SaisieValeurComponent} from "../Admin/capteurs/saisie-valeur/saisie-valeur.component";
import {MesuresComponent} from "../Admin/mesures/mesures.component";
import {RegionsComponent} from '../Admin/regions/regions.component';
import {NotificationComponent} from "../Admin/mesures/notification/notification.component";
import {MaindashboardComponent} from "../Dashboard/maindashboard/maindashboard.component";

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'dashboard',
    component: AccueilComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'villes',
        component: VillesComponent
      },
      {
        path: 'home',
        component: MaindashboardComponent
      },
      {
        path: 'capteurs',
        component: CapteursComponent
      },
      {
        path:'capteurs/:id',
        component: SaisieValeurComponent
      },
      {
        path: 'utilisateurs',
        component: UtilisateursComponent
      },
      {
        path: 'mesures',
        component: MesuresComponent,
        children: [
          {
            path: ':id',
            component:NotificationComponent,
          }
          ]
      },
      {
        path: 'regions',
        component: RegionsComponent
      },

    ]
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }
