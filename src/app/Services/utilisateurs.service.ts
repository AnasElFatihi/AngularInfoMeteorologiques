import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UtilisateursService {


  url ="http://localhost:8080/appUsers";

  constructor(private http: HttpClient) { }

  getAllUsers() {

    return this.http.get(this.url + "/all");
  }

  ajouterUser(user){
    return this.http.post(this.url + "/registerresponsable", {
      username: user.username,
      password: user.password,
      repassword: user.repassword
    }, {observe: 'response'});
  }

  deleteUser(id: any) {
    console.log(id);
    return this.http.delete(this.url + "/" +id,{observe: 'response'});

  }

  updateUtilisateur(user) {
    return this.http.put(this.url + "/" + user.id,{
      id:user.id,
      username:user.username,
      password: user.password,
      repassword: user.repassword,
      },{observe: 'response'});

  }

  getUser(id) {
    return this.http.get(this.url + "/" +id,{observe: 'response'});
  }
}
