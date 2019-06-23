import { Injectable } from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {AuthentificationService} from '../../Services/authentification.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(public authentificationService: AuthentificationService, public router: Router) {
  }

  canActivate(): boolean {
    if (this.authentificationService.isUserLogged() === true) {
      //this.router.navigate(['login']);
        return true;
      }

    // this.router.navigate(['login']);
    return false;
  }

}
