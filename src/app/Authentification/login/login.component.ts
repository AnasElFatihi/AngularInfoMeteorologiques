import { Component, OnInit } from '@angular/core';
import {AuthentificationService} from '../../Services/authentification.service';
import {User} from '../../Classes/user/user';
import {Router} from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private user: User = new User()  ;
  private userRegiter:User = new User();
  private repassword;

  constructor(private authentificationService : AuthentificationService ,  public router: Router) {
    this.user.username ="Login";
    this.user.password= "*********";
    this.userRegiter.username="Login";
    this.userRegiter.password = "*********";
    this.repassword = "*********";
  }

  ngOnInit() {
    document.body.style.background = '#FFFF';
    if(this.authentificationService.isUserLogged()) {
      this.router.navigate(['dashboard']);
    }
  }

  public login() {
    this.authentificationService.login(this.user);


  }

  enregistrer() {
    this.authentificationService.enregistrer(this.userRegiter, this.repassword);
  }
}
