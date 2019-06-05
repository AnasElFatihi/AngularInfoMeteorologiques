import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import * as jwt_decode from 'jwt-decode';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {

   url = 'http://localhost:8080/';
   public temoin = false;
   public temoinRegister = false;

  constructor(private http: HttpClient, public router: Router) {
  }

  isUserLogged(): boolean {  //

      if  (localStorage.getItem('token') !== null) {
        return true;
    }
      return false;
  }
  isUserLoggedAs(role:String): boolean {  //
    for (const   r of this.nettoyerRoles() ) {
      if  (r === role) {
        return true;
      }
    }
    return false;
  }

  login( user ) {
    return this.http.post(this.url+"login", {
      username: user.username,
      password: user.password,
    }, { observe: 'response'}).subscribe(response => {

      let tokendecoded = jwt_decode(response.headers.get('Authorization')); // token mdecodi
      localStorage.setItem('token', response.headers.get('Authorization')); // full token bash itsitf fel header dyal chak request
      localStorage.setItem('username', tokendecoded.sub);// username bash naffichiw dik monsieur ...

      localStorage.setItem('roles', tokendecoded.roles);// les roles dyalo 3la 9bel les droits ( format string avec , separa )
      localStorage.setItem('regions', tokendecoded.regions); // hadi mazal khassha tekhdem mora crud regions
      this.router.navigate(['dashboard']);
    }, error  => {
      console.log('error');
      this.temoin = true;
    });

  }
  enregistrer(user,confirmation){
    this.temoin =false;
    return this.http.post(this.url+"register", {
      username: user.username,
      password: user.password,
      repassword : confirmation
    }, { observe: 'response'}).subscribe(response => {

      let element:HTMLElement = document.getElementById('dologin') as HTMLElement;
      element.click();
      this.temoinRegister = true;

    }, error  => {
      console.log(error);

    });

  }
  nettoyerRoles():string[]{  // katakhed les roles li mstokyine o kat
    let Roles: string[];
    Roles = new Array();

    localStorage.getItem('roles').toString().split(",").forEach( (a) => {
      Roles.push(a);
    });
    return Roles;

  }
}
