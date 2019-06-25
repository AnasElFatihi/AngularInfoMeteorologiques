import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import { Capteurs } from '../Classes/capteurs';

@Injectable({
  providedIn: 'root'
})
export class CapteursService {

  url = 'http://localhost:8080/capteurs';

  constructor(private http: HttpClient, public router: Router) { }

  getAllCapteurs() {
    return this.http.get(this.url + '/all');
  }

  ajouterCapteur(capteur, ida) {

    return this.http.post(this.url + '/' + ida, {
      idcapt : capteur.idcapt,
      libelle: capteur.libelle,
      etat: capteur.etat,
      dateinstall: capteur.dateinstall,
      marque: capteur.marque,
      // region: capteur.region
    }, {observe: 'response'});
  }

  ajouterCapteur2(capteur, ida) {

    return this.http.post(this.url + '/capteurresponsable/' + ida, {
      idcapt : capteur.idcapt,
      libelle: capteur.libelle,
      etat: capteur.etat,
      dateinstall: capteur.dateinstall,
      marque: capteur.marque,
      // region: capteur.region
    }, {observe: 'response'});
  }

  deleteCapteur(id) {
    console.log(id);
    return this.http.delete(this.url + '/' + id, { observe: 'response'});
  }

  getCapteur(id) {
    return this.http.get(this.url + '/' + id , { observe: 'response'});
  }


  updateCapteur(capteur) {
    console.log(capteur);
    return this.http.put(this.url + '/' + capteur.idcapt, {
      idcapt: capteur.idcapt,
      libelle: capteur.libelle,
      etat: capteur.etat,
      dateinstall: capteur.dateinstall,
      marque: capteur.marque,
      region: capteur.region},
      { observe: 'response'});
    console.log( 'mora update' + capteur);
  }
}
