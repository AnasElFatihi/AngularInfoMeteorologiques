import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {Ville} from '../Classes/ville';

@Injectable({
  providedIn: 'root'
})
export class VilleService {

  url = 'http://localhost:8080/villes';

  constructor(private http: HttpClient, public router: Router) { }

  getAllVilles() {
    return this.http.get(this.url + "/all");
  }

  ajouterVille(ville) {

    return this.http.post(this.url, {
      latitude: ville.latitude,
      longitude: ville.longitude,
      name: ville.name
    }, {observe: 'response'});
  }

  deleteVille(id){
    console.log(id);
    return this.http.delete(this.url + "/" +id,{observe: 'response'});
  }
}
