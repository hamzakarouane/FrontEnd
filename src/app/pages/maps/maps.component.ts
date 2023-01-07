import { Component, OnInit } from '@angular/core';
import { Terrain } from './terrain';
import { HttpErrorResponse } from '@angular/common/http';
import { TerrainService } from './terrain.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.scss']
})
export class MapsComponent implements OnInit {

  title = 'argon-dashboard-angular';
    ///////////////////////////// pour TERRAIN //////////////////////////////////
    public terrains!: Terrain[];
    public editTerrain: Terrain;
    public infoTerrain: Terrain;
    public deleteTerrain : Terrain;

    ////////////////////////////////////////////////////////////////////////////

    constructor(private terrainService: TerrainService) { }

    ngOnInit() {
      this.getTerrain();
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

}
