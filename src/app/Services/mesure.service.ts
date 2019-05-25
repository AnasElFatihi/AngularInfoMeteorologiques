import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {Mesure} from "../Classes/mesure";

@Injectable({
  providedIn: 'root'
})
export class MesureService {

  url = 'http://localhost:8080/mesures';

  constructor(private http: HttpClient, public router: Router) { }

  getAllMesures() {
    return this.http.get(this.url + '/all');
  }

  ajouterCapteur(mesure: any) {
    return this.http.post(this.url, {
      mesure: mesure.mesure,
      typevaleur: mesure.type,

    }, {observe: 'response'});
  }

  deleteMesure(id: any) {
    return this.http.delete(this.url + '/' + id, { observe: 'response'});
  }

  getMesure(id: any) {
    return this.http.get(this.url + '/' + id ,{ observe: 'response'});
  }

  updateMesure(mesure: Mesure) {

    return this.http.put(this.url + '/' + mesure.id, {
      id: mesure.id,
      mesure: mesure.mesure,
      typevaleur: mesure.type,
      },{ observe: 'response'});

  }
}
