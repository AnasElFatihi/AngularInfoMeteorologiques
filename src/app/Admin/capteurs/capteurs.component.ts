import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
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

  public csvContent ;
  public donnees;

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

  @ViewChild('inputFile') myInputVariable: ElementRef;

  reset() {
    this.myInputVariable.nativeElement.value = '';
  }
  onFileSelect(input: HTMLInputElement) {
    const files = input.files;
    const content = this.csvContent;
    if (files && files.length) {

      const fileToRead = files[0];

      const fileReader = new FileReader();
      fileReader.onload = this.onFileLoad;

      fileReader.readAsText(fileToRead, "UTF-8");

    }
  }
  onFileLoad(fileLoadedEvent) {

    const csvSeparator = ';';
    const textFromFileLoaded = fileLoadedEvent.target.result;
    this.csvContent = textFromFileLoaded;
    // alert(textFromFileLoaded);

    const txt = textFromFileLoaded;
    const csv = [];
    const lines = txt.split('\n');
    lines.forEach(element => {
      const cols: string[] = element.split(csvSeparator);
      if(cols[0] !== "") csv.push(cols);
    });
    this.donnees = csv;
    console.log(this.donnees);
  }
}
