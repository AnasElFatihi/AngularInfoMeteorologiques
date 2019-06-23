import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate,Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthentificationService} from "../../Services/authentification.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuardRespGuard implements CanActivate {

  constructor(public authentificationService: AuthentificationService, public router: Router) {
  }

  canActivate(): boolean {
    if (this.authentificationService.isUserLogged() === true) {
      if (this.authentificationService.isUserLoggedAs('RESPONSABLE')) {
        // this.router.navigate(['dashboardresp']);
        return true;
      }
    }
    // this.router.navigate(['login']);
    return false;
  }
}
