import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CsvService {


  private url ='http://localhost:8080/capteursmesures' ;


  constructor(private http: HttpClient) { }

  upload(csvContent: any) {
    return this.http.post(this.url, {
      data: csvContent,
    }, {observe: 'response'});
  }
}
