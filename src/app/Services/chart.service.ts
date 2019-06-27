import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";



@Injectable({
  providedIn: 'root'
})
export class ChartService {

  url = 'http://localhost:8080/';
  constructor( private http: HttpClient) { }

   loadchartbyregion(id : any){
      return this.http.get(this.url+ "stats/" + id);

   }
  getRegionMesures(){
    return this.http.get(this.url+"stats/allregions");
  }
  getStatCapteurRegion(id){
    return this.http.get(this.url+"stats/regions/"+id)
  }
}
