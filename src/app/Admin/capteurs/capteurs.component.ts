import { Component, OnInit } from '@angular/core';
import { Capteurs } from '../../Classes/capteurs';
import {CapteursService} from '../../Services/capteurs.service';


declare var swal: any;

@Component({
  selector: 'app-capteurs',
  templateUrl: './capteurs.component.html',
  styleUrls: ['./capteurs.component.css']
})
export class CapteursComponent implements OnInit {

  public capteurs;
  public capteur: Capteurs = new Capteurs();
  public capteurEditer: Capteurs = new Capteurs();
  public editer = false ;

  constructor(private capteursService: CapteursService) {  }

  ngOnInit() {
    this.capteursService.getAllCapteurs().subscribe( ( data: any[] ) => {
      this.capteurs = data;
      console.log(this.capteurs);
    });
  }
  ajouterCapteur(e) {
    e.preventDefault();
    if (this.capteur.Libelle !== undefined && this.capteur.etat !== undefined && this.capteur.dateinstall !== undefined && this.capteur.marque !== undefined && this.capteur.region !== undefined) {
      this.capteursService.ajouterCapteur(this.capteur).subscribe(( data ) => {
        console.log(data);
        this.capteurs.push( this.capteur);
        this.capteur = new Capteurs();
        swal('Capteur ajouté!', '', 'success');
        this.capteursService.getAllCapteurs().subscribe( ( data: any[] ) => {
          this.capteurs = data;
        });
      }); }  else {
      swal('Remplissez tous les champs SVP!", "", "error');
    }}

  deleteCapteur(idcapt) {
    this.capteursService.deleteCapteur(idcapt).subscribe(( data) => {
      swal('Capteur Supprimée!', '', 'success');
      this.capteursService.getAllCapteurs().subscribe( ( data: any[] ) => {
        this.capteurs = data;
      });
    });
  }

  editerCapteur(id) {
    this.editer = true;
    this.capteursService.getCapteur(id).subscribe((data: any) => {

      this.capteur.idcapt = data.body.id;
      this.capteur.Libelle = data.body.libelle;
      this.capteur.etat = data.body.etat;
      this.capteur.dateinstall = data.body.dateinstall;
      this.capteur.marque = data.body.marque;
      this.capteur.region = data.body.region;
      console.log(this.capteurs);

    });

  }

  validerModification() {
    this.capteursService.updateCapteur(this.capteur).subscribe(( data) => {
      this.capteursService.getAllCapteurs().subscribe( (data : any[] ) => {
        this.capteurs = data;
        console.log(this.capteur);
      });
      console.log(data);

    });
    this.editer = false;
    this.capteurs = new this.capteurs();
  }
  initisaliser() {
    this.editer = false;
  }



}
