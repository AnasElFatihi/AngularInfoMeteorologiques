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
  public montableau=[];

  public data =[];

  public  socket = SocketIo("http://localhost:4000/");

  public regions;
  public regionSelected;


  public notifications =[];

  constructor(private capteursService: CapteursService, private regionService: RegionService,private csvService:CsvService
  , private sharingDataService : SharingDataService)
  { this.notifications = new Array();  }

  ngOnInit() {
    this.capteursService.getAllCapteurs().subscribe( ( data: any[] ) => {
      this.capteurs = data;
      console.log(this.capteurs);
    });
    this.regionService.getAllRegions().subscribe( ( data:any[] ) => {
      this.regions = data;
      console.log(this.regions);
    });


    this.socket.on(
      "data" ,(data) => console.log(data)
    );

    this.socket.on("notification", (data) => {
        this.notifications = data;
        this.sharingDataService.notifications= data;


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
      console.log(this.capteurs);

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
    this.data = new Array();
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
  onFileLoad = (fileLoadedEvent) => {

    const csvSeparator = ';';
    const textFromFileLoaded = fileLoadedEvent.target.result;
    this.csvContent = textFromFileLoaded;
    // alert(textFromFileLoaded);

    const txt = textFromFileLoaded;
    const csv = [];
    const lines = txt.split('\n');
    lines.forEach(element => {
      const cols: string[] = element.split(csvSeparator);
      if(cols[0] !== "")
        this.data.push(cols);
    });



    for(let i=0; i<this.data.length;i++)
      this.montableau.push({"idcapteur":this.data[i][0],"idmesure":this.data[i][1],"date":this.data[i][2],"valeur":this.data[i][3]})
    this.data = [];
  }


   uploader() {
     console.log(this.montableau);

    this.csvService.upload(this.montableau).subscribe( (data : any)=> {
        //console.log(data);
      if( data.body.length >0)
      {
        this.socket.emit("notification",data.body);

      }


    });
     this.montableau=[];
     this.reset();


  }


/*

  private initializeWebSocketConnection() {
    let ws = new SockJS(this.serverUrl);
    this.stompClient = Stomp.over(ws);
    let that = this;
    this.stompClient.connect({}, function(frame) {
      that.stompClient.subscribe("/chat", (message) => {
        if(message.body) {
          $(".chat").append("<div class='message'>"+message.body+"</div>")
          console.log(message.body);
        }
      });
    });
  }
}
