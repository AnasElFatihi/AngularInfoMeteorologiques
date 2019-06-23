import { Component, OnInit } from '@angular/core';

import * as Highcharts from 'highcharts';
import {CapteursService} from "../../Services/capteurs.service";
import {RegionService} from "../../Services/regions.service";
import {CsvService} from "../../Services/csv.service";
import {SharingDataService} from "../../Services/sharing-data.service";
import {ChartService} from "../../Services/chart.service";
import HC_map from 'highcharts/modules/map';
HC_map(Highcharts);
declare var require: any;
const mapWorld = require('@highcharts/map-collection/countries/ma/ma-all.geo.json');
@Component({
  selector: 'app-maindashboard',
  templateUrl: './maindashboard.component.html',
  styleUrls: ['./maindashboard.component.css']
})
export class MaindashboardComponent implements OnInit {

  public regions;


  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options = {
    series: [{
      data: [1, 2, 3],
      type: 'line'
    }]
  };

  chartOptions1;

  ngOnInit() {
      this.regionService.getAllRegions().subscribe( ( data : any[] )=>{
      this.regions = data;
      this.chartService.loadchartbyregion(this.regions[0].id).subscribe( ( donnee : any[] ) => {
        console.log(donnee);
        let a = Array();
        a[0]=donnee[0][2];
        let temoin = true;
        for (let  i=1;i < donnee.length ;i++) {
            temoin = true;
            for(let j=0;j<a.length;j++)
              if(a[j] == donnee[i][2] )
                temoin = false;
            if(temoin)
              a.push(donnee[i][2]);
        }
        //console.log(a);
        let dates=[];
        let mesures={};   // alocation dymaqiue d'un tableau pour chak mesure
        for (let  i=0;i < a.length ;i++) {
          mesures[String(a[i])]= new Array();
        }
        dates[0]= donnee[0][1]; // les dates
        for (let  i=1;i < donnee.length ;i++) {
          temoin = true;
          for(let j=0;j<dates.length;j++)
            if(dates[j] == donnee[i][1] )
              temoin = false;
          if(temoin)
            dates.push(donnee[i][1]);
        }
        console.log(dates);
        for(let j=0;j<donnee.length;j++){
          let vars= Array();
          for (let i =0;i< dates.length;i++) {
            if (dates[i] === donnee[j][1]) {
              mesures[String(donnee[j][2])].push(donnee[j][0]);
              vars.push(String(donnee[j][2]));
            }
          }
          for(let k=0;k<a.length;k++)
            if(vars.indexOf(String(a[k]))<0)
              mesures[String(a[k])].push(0);
        }
        console.log(mesures);

        //creation des series
        let mesSeries =Array();
        for(let k=0;k<a.length;k++){
          mesSeries.push({
            name:a[k],
            data:mesures[a[k]]
          });
        }
        console.log(mesSeries);
        //nettoyer les dates
        for(let h=0;h<dates.length;h++)
          dates[h]=dates[h].substring(0,10);

        // partie insertion des donnes dans options
        this.chartOptions1 = {
          chart: {
            type: "spline"
          },
          title: {
            text: "Statistiques par Regions"
          },
          subtitle: {
            text: "Source: http://localhost:8080"
          },
          xAxis:{
            categories:dates
          },
          yAxis: {
            title:{
              text:"Mesures"
            }
          },
          tooltip: {
            valueSuffix:[ ]
          },
          series: mesSeries
        };
      });
         });


  }

  constructor(private chartService: ChartService,private  regionService:RegionService) {

  }

  public regionchoisie;
  changerStatregion(){
    this.chartService.loadchartbyregion(this.regionchoisie).subscribe( ( donnee : any[] ) => {
      console.log(donnee);
      let a = Array();
      a[0]=donnee[0][2];
      let temoin = true;
      for (let  i=1;i < donnee.length ;i++) {
        temoin = true;
        for(let j=0;j<a.length;j++)
          if(a[j] == donnee[i][2] )
            temoin = false;
        if(temoin)
          a.push(donnee[i][2]);
      }
      //console.log(a);
      let dates=[];
      let mesures={};   // alocation dymaqiue d'un tableau pour chak mesure
      for (let  i=0;i < a.length ;i++) {
        mesures[String(a[i])]= new Array();
      }
      dates[0]= donnee[0][1]; // les dates
      for (let  i=1;i < donnee.length ;i++) {
        temoin = true;
        for(let j=0;j<dates.length;j++)
          if(dates[j] == donnee[i][1] )
            temoin = false;
        if(temoin)
          dates.push(donnee[i][1]);
      }
      console.log(dates);
      for(let j=0;j<donnee.length;j++){
        let vars= Array();
        for (let i =0;i< dates.length;i++) {
          if (dates[i] === donnee[j][1]) {
            mesures[String(donnee[j][2])].push(donnee[j][0]);
            vars.push(String(donnee[j][2]));
          }
        }
        for(let k=0;k<a.length;k++)
          if(vars.indexOf(String(a[k]))<0)
            mesures[String(a[k])].push(0);
      }
      console.log(mesures);

      //creation des series
      let mesSeries =Array();
      for(let k=0;k<a.length;k++){
        mesSeries.push({
          name:a[k],
          data:mesures[a[k]]
        });
      }
      console.log(mesSeries);
      //nettoyer les dates
      for(let h=0;h<dates.length;h++)
        dates[h]=dates[h].substring(0,10);

      // partie insertion des donnes dans options
      this.chartOptions1 = {
        chart: {
          type: "spline"
        },
        title: {
          text: "Statistiques par Regions"
        },
        subtitle: {
          text: "Source: http://localhost:8080"
        },
        xAxis:{
          categories:dates
        },
        yAxis: {
          title:{
            text:"Mesures"
          }
        },
        tooltip: {
          valueSuffix:[ ]
        },
        series: mesSeries
      };
    });

  }

  chartMap: Highcharts.Options = {
    chart: {
      map: mapWorld
    },
    title: {
      text: 'Highmaps basic demo'
    },
    subtitle: {
      text: 'Source map: <a href="https://code.highcharts.com/mapdata/countries/ma/ma-all.js">World, Miller projection, medium resolution</a>'
    },
    mapNavigation: {
      enabled: true,
      buttonOptions: {
        alignTo: 'spacingBox'
      }
    },
    legend: {
      enabled: true
    },
    colorAxis: {
      min: 0
    },
    series: [
      {
      name: 'Random data',
      states: {
        hover: {
          color: '#BADA55'
        },
      },
      dataLabels: {
        enabled: true,
        format: '{point.name}'
      },

     data: [
        ['ma-rz', 0],
        ['ma-mt', 1],
        ['ma-td', 2],
        ['ma-or', 3],
        ['ma-fb', 4],
        ['ma-sm', 5],
        ['ma-mk', 6],
        ['ma-da', 7],
        ['ma-ge', 8],
        ['ma-lb', 9],
        ['ma-od', 10],
        ['ma-to', 11],
        ['ma-th', 12],
        ['ma-gb', 13],
        ['ma-co', 14],
        ['ma-gc', 15]
       ]
    } as Highcharts.SeriesMapOptions]
  };





}
