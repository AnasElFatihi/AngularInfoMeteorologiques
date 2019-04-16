import { Component, OnInit } from '@angular/core';
import {AuthentificationService} from '../../Services/authentification.service';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements OnInit {

  public username;

  constructor(private authentificationService: AuthentificationService) { }

  ngOnInit(){
    this.username = localStorage.getItem('username');
  }

  logout(){
    localStorage.clear();
    sessionStorage.clear();
    console.log(localStorage.getItem('token'));
  }
}
