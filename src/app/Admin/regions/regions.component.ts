import { Component, OnInit } from '@angular/core';
import {Region} from "../../Classes/region";
import {RegionService} from "../../Services/regions.service";
import {Ville} from "../../Classes/ville";
import {VilleService} from "../../Services/ville.service";
import {Router} from "@angular/router";



declare var swal: any;
@Component({
  selector: 'app-regions',
  templateUrl: './regions.component.html',
  styleUrls: ['./regions.component.css']
})
export class RegionsComponent implements OnInit {
  public regions;
  public region: Region = new Region();
  public regionEditer: Region = new Region();
  public editer = false;
  public villes;
  //public ville: Ville = new Ville();
  public selectedVille;
  constructor(private regionService: RegionService, private villeService: VilleService) {  }


  ngOnInit(){
        this.regionService.getAllRegions().subscribe( ( data:any[] ) => {
         this.regions = data;
          console.log(this.regions);

    });
    this.villeService.getAllVilles().subscribe( ( data:any[] ) => {
      this.villes = data;
      console.log(this.villes);
    });

  }


  ajouterRegion(e){
    e.preventDefault();

    //console.log(this.region);
    if(this.region.name !== undefined && this.region.name != null){
      this.regionService.ajouterRegion(this.region, this.selectedVille).subscribe(( data ) =>{
        console.log(data);
        this.regions.push( this.region);
        this.region = new Region();
        swal("Region ajoutée!", "", "success");
        this.regionService.getAllRegions().subscribe( ( data:any[] ) => {
          this.regions = data;
        });
      });}
    else{
      swal("Remplissez tous les champs SVP!", "", "error");
    }
  }

  deleteRegion(id){
    this.regionService.deleteRegion(id).subscribe(( data) => {
      swal("Region Supprimée!", "", "success");

      this.regionService.getAllRegions().subscribe( ( data:any[] ) => {
        this.regions = data;
      });
    });
  }


  editerRegion(id){
    this.editer=true;
    //console.log(this.regions);
    this.regionService.getRegion(id).subscribe(( data:any) => {
      this.region.id = data.body.id;
      this.region.name = data.body.name;
      this.region.ville = data.body.ville;
      console.log(this.region.ville);
      //console.log(this.region.ville.name);

    });

  }

  validerModification() {
    console.log(this.region);
    this.regionService.updateRegion(this.region).subscribe(( data) => {
      this.regionService.getAllRegions().subscribe( ( data: any[] ) => {
        this.regions = data;
        console.log(this.regions);
      });
      //console.log(data);

    });
    this.editer=false;
    this.region=new Region();
  }
  initisaliser(){
    this.editer=false;
  }


}

