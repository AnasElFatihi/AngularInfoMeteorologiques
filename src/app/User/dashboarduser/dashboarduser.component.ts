import { Component, OnInit } from '@angular/core';
import {AuthentificationService} from "../../Services/authentification.service";

@Component({
  selector: 'app-dashboarduser',
  templateUrl: './dashboarduser.component.html',
  styleUrls: ['./dashboarduser.component.css']
})
export class DashboarduserComponent implements OnInit {

  public username;
  public  initialisation = false;

  constructor(private authentificationService: AuthentificationService ) { }

  ngAfterViewInit() {

  }
  ngOnInit() {
    this.username = localStorage.getItem('username');
  }

  logout() {
    localStorage.clear();
    sessionStorage.clear();
    console.log(localStorage.getItem('token'));
  }

}
