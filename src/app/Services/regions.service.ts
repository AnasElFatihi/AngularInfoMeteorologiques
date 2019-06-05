import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {VilleService} from "./ville.service";

@Injectable({
  providedIn: 'root'
})
export class RegionService {
  url = 'http://localhost:8080/regions';

  constructor(private http: HttpClient, public router: Router ) { }

  getAllRegions() {
    return this.http.get(this.url + '/all');
  }
  getRegion(id) {
    return this.http.get(this.url + '/' + id, { observe: 'response'});
  }

  ajouterRegion(region, ida) {

    return this.http.post(this.url + '/' + ida, {
      name: region.name,
      id : region.id,
      ville: region.ville
    }, {observe: 'response'});
  }

  deleteRegion(id) {
    console.log(id);
    return this.http.delete(this.url + '/' + id,{observe: 'response'});
  }
  updateRegion(region) {

    return this.http.put(this.url + '/' + region.id,{
      id: region.id,
      name: region.name,
      ville: region.ville
    }, { observe: 'response'});

  }


}

