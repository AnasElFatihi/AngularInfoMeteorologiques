import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Capteurs} from '../../Classes/capteurs';
import {CapteursService} from '../../Services/capteurs.service';
import {RegionService} from "../../Services/regions.service";


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

  public regions;
  public regionSelected;

  constructor(private capteursService: CapteursService, private regionService: RegionService ) {  }

  ngOnInit() {
    this.capteursService.getAllCapteurs().subscribe( ( data: any[] ) => {
      this.capteurs = data;
      console.log(this.capteurs);
    });
    this.regionService.getAllRegions().subscribe( ( data:any[] ) => {
      this.regions = data;
      console.log(this.regions);
    });
  }


  ajouterCapteur(e) {
    e.preventDefault();
    if (this.capteur.libelle !== undefined && this.capteur.etat !== undefined && this.capteur.dateinstall !== undefined && this.capteur.marque !== undefined && this.regionSelected !== undefined) {
      this.capteursService.ajouterCapteur(this.capteur, this.regionSelected).subscribe(( data ) => {
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

    this.capteursService.getCapteur(id).subscribe(( data:any) => {
      console.log(data);
      this.capteur.idcapt = data.body.idcapt;
      this.capteur.libelle = data.body.libelle;
      this.capteur.etat = data.body.etat;
      this.capteur.dateinstall = data.body.dateinstall;
      this.capteur.marque = data.body.marque;
      this.capteur.region = data.body.region;
      console.log(this.capteur.region);
    });
  }

  validerModification() {
    this.capteursService.updateCapteur(this.capteur).subscribe(( data) => {
      this.capteursService.getAllCapteurs().subscribe( (data : any[] ) => {
        this.capteurs = data;

      });


    });
    this.editer = false;
    this.capteur = new Capteurs();
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
