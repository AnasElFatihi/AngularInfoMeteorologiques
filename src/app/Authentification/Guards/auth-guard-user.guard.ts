import { Injectable } from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthentificationService} from '../../Services/authentification.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardUserGuard implements CanActivate {

  constructor(public authentificationService: AuthentificationService, public router: Router) {
  }

  canActivate(): boolean {
    if (this.authentificationService.isUserLogged() === true) {
      if (this.authentificationService.isUserLoggedAs('USER')) {
        // this.router.navigate(['dashboarduser']);
        return true;
      }
    }
    // this.router.navigate(['login']);
    return false;
  }
}