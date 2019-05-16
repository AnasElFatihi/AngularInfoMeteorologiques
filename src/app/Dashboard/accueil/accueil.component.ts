import { Component, OnInit } from '@angular/core';
import {AuthentificationService} from '../../Services/authentification.service';
import {ActivatedRoute, Router} from '@angular/router';



@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements OnInit {

  public username;
  public  initialisation = false;

  constructor(private authentificationService: AuthentificationService ) {



  }

  ngOnInit() {


    this.username = localStorage.getItem('username');

  }
  ngAfterViewInit() {


  }



  logout(){
    localStorage.clear();
    sessionStorage.clear();
    console.log(localStorage.getItem('token'));
  }
}
