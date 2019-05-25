import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent} from '../Authentification/login/login.component';
import {AccueilComponent} from '../Dashboard/accueil/accueil.component';
import { AuthGuardService as AuthGuard} from  '../Authentification/Guards/auth-guard.service';
import {VillesComponent} from '../Admin/villes/villes.component';
import {CapteursComponent} from '../Admin/capteurs/capteurs.component';
import {RegionsComponent} from '../Admin/regions/regions.component';

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
        path: 'capteurs',
        component: CapteursComponent
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
