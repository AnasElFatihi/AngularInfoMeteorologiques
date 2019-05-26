import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {MesNotifications} from "../Classes/mes-notifications";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  url = 'http://localhost:8080/notifications';

  constructor(private http: HttpClient, public router: Router) { }


  ajouterNotification(notification: MesNotifications, id: any) {

    return this.http.post(this.url+"/"+id, {
      message: notification.message,
      seuilmin: notification.seuilmin,
      seuilmax: notification.seuilmax,
    }, {observe: 'response'});

  }

  getAllNotifications(id) {
    return this.http.get(this.url + '/all/'+id);
  }

  delete(id: any) {
    return this.http.delete(this.url + '/' + id, { observe: 'response'});
  }

  getNotification(id: any) {

    return this.http.get(this.url + '/' + id ,{ observe: 'response'});

  }

  updateNotification(notification: MesNotifications,id :any) {
    return this.http.put(this.url + '/' + notification.id +'/'+id, {
      id: notification.id,
      seuilmin: notification.seuilmin,
      seuilmax: notification.seuilmax,
      message: notification.message},{ observe: 'response'});
  }

  }

