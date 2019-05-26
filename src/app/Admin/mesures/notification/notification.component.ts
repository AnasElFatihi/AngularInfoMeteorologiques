import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";

import {NotificationService} from "../../../Services/notification.service";
import {MesNotifications} from "../../../Classes/mes-notifications";
import {Capteurs} from "../../../Classes/capteurs";


declare var swal: any;

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

  private id;
  public notifications ;
  public notification = new MesNotifications();
  public notificationEditer = new MesNotifications();
  public editer = false ;
  public a ;

  constructor(private route: ActivatedRoute,private notificationService:NotificationService) { }

  ngOnInit() {
    this.id = this.route.snapshot.queryParamMap.get("id");
    this.route.paramMap.subscribe(params => {
      this.id = params.get("id");
      this.notificationService.getAllNotifications(this.id).subscribe(( data: any[] ) => {
        this.notifications = data;
        console.log(this.notifications);
      });
    })


  }


  ajouterNotification($event: MouseEvent) {
    $event.preventDefault();
    if (this.notification.message !== undefined && this.notification.seuilmin !== undefined && this.notification.seuilmax !== undefined ) {
      this.notificationService.ajouterNotification(this.notification,this.id).subscribe(( data ) => {
        console.log(data);
        this.notifications.push( this.notification);
        this.notification = new MesNotifications();
        swal('Notification ajoutée!', '', 'success');
        this.notificationService.getAllNotifications(this.id).subscribe( ( data: any[] ) => {
          this.notifications = data;
        });
      }); }  else {
      swal('Remplissez tous les champs SVP!", "", "error');
    }
  }

  deleteNotification(id: any) {


    this.notificationService.delete(id).subscribe(( data) => {
      swal('Notification Supprimée!', '', 'success');
      this.notificationService.getAllNotifications(this.id).subscribe( ( data: any[] ) => {
        this.notifications = data;
      });
    });

  }

  editerNotification(id: any) {
    this.editer = true;
    this.notificationService.getNotification(id).subscribe((data: any) => {

      this.notification.id = data.body.id;
      this.notification.seuilmin = data.body.seuilmin;
      this.notification.message = data.body.message;
      this.notification.seuilmax = data.body.seuilmax;


    });

  }

  initisaliser() {
    this.editer=false;
  }

  validerModification() {
    this.notificationService.updateNotification(this.notification,this.id).subscribe(( data) => {
      this.notificationService.getAllNotifications(this.id).subscribe( (data : any[] ) => {
        this.notifications = data;

      });


    });
    this.editer = false;
    this.notification = new MesNotifications();
  }
}
