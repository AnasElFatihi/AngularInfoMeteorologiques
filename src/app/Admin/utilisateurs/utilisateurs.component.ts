import { Component, OnInit } from '@angular/core';

import {User} from '../../Classes/user/user';
import {UtilisateursService} from '../../Services/utilisateurs.service';
import {Ville} from "../../Classes/ville";


declare var swal: any;

@Component({
  selector: 'app-utilisateurs',
  templateUrl: './utilisateurs.component.html',
  styleUrls: ['./utilisateurs.component.css']
})
export class UtilisateursComponent implements OnInit {

  user = new User();
  public uerEditer = new User();
  public editer = false;
  users;

  constructor(private utilisateurService: UtilisateursService) { }

  ngOnInit() {

    this.utilisateurService.getAllUsers().subscribe( ( data: any[] ) => {
      this.users = data;
      console.log(this.users);
    });

  }

  ajouterUser(e: MouseEvent) {
    e.preventDefault();
    if(this.user.username !== undefined && this.user.password !== undefined && this.user.repassword !== undefined && this.user.username != null){
      this.utilisateurService.ajouterUser(this.user).subscribe(data  =>{
        console.log(data);
        this.users.push( this.user);
        this.user =new User();
        swal("User ajouté!", "", "success");
        this.utilisateurService.getAllUsers().subscribe( ( data:any[] ) => {
          this.users = data;
        });
      },
        error => {swal("Vérifier tous les champs SVP!", "", "error");}

        );}
    else{
      swal("Remplissez tous les champs SVP!", "", "error");
    }
  }

  deleteUser(id: any) {

    this.utilisateurService.deleteUser(id).subscribe(( data) => {
      swal("User Supprimé!", "", "success");
      this.utilisateurService.getAllUsers().subscribe( ( data:any[] ) => {
        this.users = data;
      });
    });
  }

  initisaliser() {
    this.editer=false;
  }

  validerModification() {
    this.utilisateurService.updateUtilisateur(this.user).subscribe(( data) => {
      this.utilisateurService.getAllUsers().subscribe( ( data:any[] ) => {
        this.users = data;

      });


    });
    this.editer=false;
    this.user=new User();

  }

  editerUser(id: any) {

    this.editer=true;
    this.utilisateurService.getUser(id).subscribe(( data:any) => {

      this.user.id=data.body.id;
      this.user.username=data.body.username;
      this.user.password="";
      this.user.repassword="";
      console.log(this.user);

    });

  }
}
