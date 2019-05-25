import { Component, OnInit } from '@angular/core';
import {Capteurs} from "../../Classes/capteurs";
import {CapteursService} from "../../Services/capteurs.service";
import {Mesure} from "../../Classes/mesure";
import {MesureService} from "../../Services/mesure.service";

declare var swal: any;

@Component({
  selector: 'app-mesures',
  templateUrl: './mesures.component.html',
  styleUrls: ['./mesures.component.css']
})
export class MesuresComponent implements OnInit {

  public mesure =new Mesure();
  public mesures ;
  public mesureEditer = new Mesure();
  public editer = false ;



  constructor(private mesureService: MesureService) {  }

  ngOnInit() {
    this.mesureService.getAllMesures().subscribe( ( data: any[] ) => {
      this.mesures = data;
      console.log(this.mesures);
    });
  }
  /*


  validerModification() {

  }
  */
  initisaliser() {
    this.editer = false;
    this.mesure= new Mesure();
  }

  ajouterCapteur($event: MouseEvent) {
    $event.preventDefault();
    if (this.mesure.mesure !== undefined && this.mesure.type !== undefined ) {
      this.mesureService.ajouterCapteur(this.mesure).subscribe(( data ) => {
        console.log(data);
        this.mesure = new Mesure();
        swal('Mesure ajoutée!', '', 'success');
        this.mesureService.getAllMesures().subscribe( ( data: any[] ) => {
          this.mesures = data;
        });
      }); }  else {
      swal("Remplissez tous les champs SVP!", "", "error");

    }

  }

  deleteMesure(id: any) {
    this.mesureService.deleteMesure(id).subscribe(( data) => {
      swal('Mesure Supprimée!', '', 'success');
      this.mesureService.getAllMesures().subscribe( ( data: any[] ) => {
        this.mesures = data;
      });
    });
  }

  editerMesure(id: any) {
    this.editer = true;
    this.mesureService.getMesure(id).subscribe((data: any) => {

      this.mesure.id = data.body.id;
      this.mesure.mesure = data.body.mesure;
      this.mesure.type = data.body.typevaleur;
    });

  }

  validerModification() {
    this.mesureService.updateMesure(this.mesure).subscribe(( data) => {
      this.mesureService.getAllMesures().subscribe( (data : any[] ) => {
        swal('Mesure modifiée!', '', 'success');
        this.mesures = data;

      });


    });
    this.editer = false;

  }
}
