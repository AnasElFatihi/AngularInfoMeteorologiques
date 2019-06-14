import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {VilleService} from '../../Services/ville.service';
import {Ville} from '../../Classes/ville';
import {Observable} from 'rxjs';

declare var swal: any;

@Component({
  selector: 'app-villes',
  templateUrl: './villes.component.html',
  styleUrls: ['./villes.component.css']
})
export class VillesComponent implements OnInit {

  public  villes;
  public ville: Ville = new Ville();
  public villeEditer:Ville = new Ville();
  public editer = false;


  constructor(private villeService: VilleService) {  }

  ngOnInit(){
      this.villeService.getAllVilles().subscribe( ( data:any[] ) => {
       this.villes = data;
       console.log(this.villes);
    });
  }
  ajouterVille(e){
    e.preventDefault();
    if(this.ville.name !== undefined && this.ville.latitude !== undefined && this.ville.longitude !== undefined && this.ville.name != null){
      this.villeService.ajouterVille(this.ville).subscribe(( data ) =>{
        console.log(data);
        this.villes.push( this.ville);
        this.ville =new Ville();
        swal("Ville ajoutée!", "", "success");
        this.villeService.getAllVilles().subscribe( ( data:any[] ) => {
          this.villes = data;
        });
    });}
    else{
        swal("Remplissez tous les champs SVP!", "", "error");
      }
    }

    deleteVille(id){
    this.villeService.deleteVille(id).subscribe(( data) => {
      swal("Ville Supprimée!", "", "success");
      this.villeService.getAllVilles().subscribe( ( data:any[] ) => {
        this.villes = data;
      });
    });
    }


    editerVille(id){
    this.editer=true;
      this.villeService.getVille(id).subscribe(( data:any) => {

        this.ville.id=data.body.id;
        this.ville.name=data.body.name;
        this.ville.latitude=data.body.latitude;
        this.ville.longitude=data.body.longitude;
      console.log(this.ville);

      });

    }

  validerModification() {
    this.villeService.updateVille(this.ville).subscribe(( data) => {
      this.villeService.getAllVilles().subscribe( ( data:any[] ) => {
        this.villes = data;
        console.log(this.villes);
      });
      console.log(data);

    });
    this.editer=false;
    this.ville=new Ville();
  }
  initisaliser(){
    this.editer=false;
  }


  /*let element: HTMLElement = document.getElementsByClassName('chevron')[0] as HTMLElement;
  element.click();*/
}
