import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {AuthentificationService} from '../../Services/authentification.service';
import {ActivatedRoute, Router} from '@angular/router';
import {CapteursComponent} from "../../Admin/capteurs/capteurs.component";
import {SharingDataService} from "../../Services/sharing-data.service";
import * as SocketIo from 'socket.io-client';
import {ChartService} from "../../Services/chart.service";

import * as Highcharts from 'highcharts';
declare var swal: any;


@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements OnInit, AfterViewInit {

  public username;
  public  initialisation = false;

  public  socket = SocketIo("http://localhost:4000/");


  public notifications =[];

  constructor(private authentificationService: AuthentificationService,private sharingDataService : SharingDataService ,private chartService : ChartService) {

  }
  @ViewChild('charts') public chartEl: ElementRef;

  ngOnInit() {


    this.username = localStorage.getItem('username');

    this.socket.on("notification", (data) => {
      this.notifications = data;
      this.sharingDataService.notifications= data;
      console.log(this.notifications);

    });






  }

  ngAfterViewInit() {

    //console.log(localStorage.getItem("regions'));

  }



  logout() {
    localStorage.clear();
    sessionStorage.clear();
    console.log(localStorage.getItem('token'));
  }

  focusOutFunction() {
    this.notifications=[];
  }





}
