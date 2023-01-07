import { Component, OnInit } from '@angular/core';
import { Terrain } from './terrain';
import { HttpErrorResponse } from '@angular/common/http';
import { TerrainService } from './terrain.service';
import { NgForm } from '@angular/forms';
import Chart from 'chart.js';

// core components
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2
} from "../../variables/charts";
import { Ville } from './ville';



@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.scss']
})
export class TablesComponent implements OnInit {
  
  title = 'argon-dashboard-angular';
  public datasets: any;
  public data: any;
  public salesChart;
  public clicked: boolean = true;
  public clicked1: boolean = false;
    ///////////////////////////// pour TERRAIN //////////////////////////////////
    public terrains!: Terrain[];
    public villes!: Ville[];

    public editTerrain: Terrain;
    public infoTerrain: Terrain;
    public deleteTerrain : Terrain;

    public editVille : Ville;
    public deleteVille : Ville;

    ////////////////////////////////////////////////////////////////////////////

    constructor(private terrainService: TerrainService) { }

    ngOnInit() {
      this.getTerrain();
      this.getVille();

      this.getDash();
      this.datasets = [
        [0, 20, 10, 30, 15, 40, 20, 60, 60],
        [0, 20, 5, 25, 10, 30, 15, 40, 40]
      ];
      this.data = this.datasets[0];
  
  
      var chartOrders = document.getElementById('chart-orders');
  
      parseOptions(Chart, chartOptions());
  
  
      var ordersChart = new Chart(chartOrders, {
        type: 'bar',
        options: chartExample2.options,
        data: chartExample2.data
      });
  
      var chartSales = document.getElementById('chart-sales');
  
      this.salesChart = new Chart(chartSales, {
        type: 'line',
        options: chartExample1.options,
        data: chartExample1.data
      });
    }

    public updateOptions() {
      this.salesChart.data.datasets[0].data = this.data;
      this.salesChart.update();
    }
  
  
    public getTerrain(): void {
      this.terrainService.getTerrain().subscribe(
        (response: Terrain[]) => {
          this.terrains = response;
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
    }

    public getVille(): void {
      this.terrainService.getVille().subscribe(
        (response: Ville[]) => {
          this.villes = response;
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
    }


    public onOpenModal(terrain: Terrain | null, mode: string): void {
      const container = document.getElementById("main-container");
      const button = document.createElement('button');
      button.type = 'button';
      button.style.display = 'none';
      button.setAttribute('data-bs-toggle', 'modal');
  
      if (mode === 'add') {
        button.setAttribute('data-bs-target', '#addTerrainModal');
      }
      if (mode === 'edit') {
        this.editTerrain = terrain;
        button.setAttribute('data-bs-target', '#editTerrainModal');
      }
      if (mode === 'delete') {
        this.deleteTerrain = terrain;
        button.setAttribute('data-bs-target', '#deleteTerrainModal');
      }
      if (mode === 'info') {
        this.infoTerrain = terrain;
        button.setAttribute('data-bs-target', '#infoTerrainModal');
      }
  
      container.appendChild(button);
      button.click();
  
    }

    //////////////////////////open Modala//////////////////////////////////////////
    public onOpenModala(ville: Ville, mode: string): void {
      const container = document.getElementById("main-container");
      const button = document.createElement('button');
      button.type = 'button';
      button.style.display = 'none';
      button.setAttribute('data-bs-toggle', 'modal');
  
      if (mode === 'adda') {
        button.setAttribute('data-bs-target', '#addModala');
      }
      if (mode === 'edita') {
        this.editVille = ville;
        button.setAttribute('data-bs-target', '#editModala');
      }
      if (mode === 'deletea') {
        this.deleteVille = ville;
        button.setAttribute('data-bs-target', '#deleteModala');
      }
  
      container.appendChild(button);
      button.click();
  
    }

    ////////////////// add terrain ////////////////////////////////
    public onAddTerrain(addTerrain: NgForm): void {
      this.terrainService.addTerrain(addTerrain.value).subscribe(
        (response: Terrain) => {
          console.log(response);
          this.getTerrain();
          addTerrain.reset();
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
          addTerrain.reset();
        }
      );
    }
    public onAddAssurance(addAssurance: NgForm): void {
      document.getElementById('addClosea').click();
      this.terrainService.addVille(addAssurance.value).subscribe(
        (response: Ville) => {
          console.log(response);
          this.getVille();
          addAssurance.reset();
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
          addAssurance.reset();
        }
      );
    }

    ///////////////////////// edit terrain //////////////////////////
    public onEditTerrain(terrain: Terrain): void {
      this.terrainService.updateTerrain(terrain).subscribe(
        (response: Terrain) => {
          console.log(response);
          this.getTerrain();
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
    }

    public onEditAssurance(ville: Ville): void {
      document.getElementById('editClosea').click();
      this.terrainService.updateVille(ville).subscribe(
        (response: Ville) => {
          console.log(response);
          this.getVille();
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
    }

    /////////////////////// delete Terrain ////////////////////
    public onDeleteTerrain(id: number): void {
      this.terrainService.deleteTerrain(id).subscribe(
        (response: void) => {
          console.log(response);
          this.getTerrain();
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
    }
    public onDeleteAssurance(id: number): void {
      document.getElementById('deleteClosea').click();
      this.terrainService.deleteVille(id).subscribe(
        (response: void) => {
          console.log(response);
          this.getVille();
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
    }

    /////////////////////////// search Terrain /////////////////////
    public searchTerrain(key: string): void {
      const results: Terrain[] = [];
      for (const terrain of this.terrains) {
        if (terrain.nom.toLowerCase().indexOf(key.toLowerCase()) !== -1
          || terrain.type.toLowerCase().indexOf(key.toLowerCase()) !== -1
        ) {
          results.push(terrain);
        }
      }
      this.terrains = results;
      if (results.length === 0 || !key) {
        this.getTerrain();
      }
    }


    getDash(){
      console.log("loginnnnn");
      let table1 = [];
      let table2 = [];
      this.terrainService.getTerrain().subscribe(
        (response: Terrain[] )=>{
          this.terrains = response;
          console.log(this.terrains)
          for(let arry of response){
  
  
            table2.push(arry.nom)
            table1.push(arry.tarif)
  
          }
  
  
          var chartOrders = document.getElementById('chart-sales');
  
          parseOptions(Chart, chartOptions());
  
  
          var ordersChart = new Chart(chartOrders, {
            type: 'bar',
            options:{
              scales: {
                yAxes: [
                  {
                    ticks: {
                      callback: function (value) {
                        if (!(value % 10)) {
                          //return '$' + value + 'k'
                          return value;
                        }
                      }
                    }
                  }
                ]
              },
              tooltips: {
                callbacks: {
                  label: function (item, data) {
                    var label = data.datasets[item.datasetIndex].label || "";
                    var yLabel = item.yLabel;
                    var content = "";
                    if (data.datasets.length > 1) {
                      content += label;
                    }
                    content += yLabel;
                    return content;
                  }
                }
              }
            } ,
            data:{
              labels:table2,
              datasets: [
                {
                  label: "Nom",
                  data: table1,
                  maxBarThickness: 10
                }
              ]
            }
          });
  
  
  
          parseOptions(Chart, chartOptions());
  
          var chartSales = document.getElementById('chart-orders');
  
          this.salesChart = new Chart(chartSales, {
            type: 'line',
            options: {
              scales: {
                yAxes: [
                  {
                    ticks: {
                      callback: function (value) {
                        if (!(value % 10)) {
                          //return '$' + value + 'k'
                          return value;
                        }
                      }
                    }
                  }
                ]
              },
              tooltips: {
                callbacks: {
                  label: function (item, data) {
                    var label = data.datasets[item.datasetIndex].label || "";
                    var yLabel = item.yLabel;
                    var content = "";
                    if (data.datasets.length > 1) {
                      content += label;
                    }
                    content += yLabel;
                    return content;
                  }
                }
              }
            },
            data: {
              labels: table2,
              datasets: [
                {
                  label: "Sales",
                  data:[ 2003.5, 500, 250, 10, 30, 15, 40, 40],
                  maxBarThickness: 10
                }
              ]
            }
          });
  
        },
        (error:HttpErrorResponse)=>{
          alert(error.message)
        }
      )
  
    }

}
