import { Component, OnInit } from '@angular/core';
import {AuthentificationService} from "../../Services/authentification.service";
// import  { AgmCoreModule } from '@agm/core';


@Component({
  selector: 'app-dashboarduser',
  templateUrl: './dashboarduser.component.html',
  styleUrls: ['./dashboarduser.component.css']
})
export class DashboarduserComponent implements OnInit {

  public username;
  public  initialisation = false;
  title: string = 'My first AGM project';
  lat: number = 31.6341600;
  lng: number =  -7.9999400;

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
