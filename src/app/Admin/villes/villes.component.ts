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

  constructor(private villeService: VilleService) {  }

  ngOnInit(){
      this.villeService.getAllVilles().subscribe( ( data:any[] ) => {
       this.villes = data;
       console.log(this.villes);
    });
  }
  ajouterVille(e){
    e.preventDefault();
    if(this.ville.name !== undefined && this.ville.latitude !== undefined && this.ville.longitude !== undefined){
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


}
