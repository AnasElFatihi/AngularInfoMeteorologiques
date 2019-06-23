import { Component, OnInit } from '@angular/core';
import {AuthentificationService} from "../../Services/authentification.service";

@Component({
  selector: 'app-dashboardresp',
  templateUrl: './dashboardresp.component.html',
  styleUrls: ['./dashboardresp.component.css']
})
export class DashboardrespComponent implements OnInit {

  public username;
  public region ;
  public  initialisation = false;

  constructor(private authentificationService: AuthentificationService ) { }
  ngOnInit() {


    this.username = localStorage.getItem('username');
    this.region = localStorage.getItem('region');
  }
  ngAfterViewInit() {


  }



  logout() {
    localStorage.clear();
    sessionStorage.clear();
    console.log(localStorage.getItem('token'));
  }

}
