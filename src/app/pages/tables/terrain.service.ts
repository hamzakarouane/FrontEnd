import { Ville } from './ville';
import { Injectable } from '@angular/core';
import { Terrain } from './terrain';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TerrainService {

  private apiServerUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  public getTerrain(): Observable<Terrain[]>{
    return this.http.get<Terrain[]>(`${this.apiServerUrl}/getTerrains`);
  }

  public addTerrain(terrain : Terrain): Observable<Terrain>{
    return this.http.post<Terrain>(`${this.apiServerUrl}/addTerrain`,terrain);
  } 

  public updateTerrain(terrain : Terrain) : Observable<Terrain>{
    return this.http.put<Terrain>(`${this.apiServerUrl}/updateTerrain`,terrain);
  }

  public deleteTerrain(id : number): Observable<void>{
    return this.http.delete<void>(`${this.apiServerUrl}/deleteTerrain/${id}`);

  }

  /////////////////////////////////////////////////////////////////////////////////////

  public getVille(): Observable<Ville[]>{
    return this.http.get<Ville[]>(`${this.apiServerUrl}/getVilles`);
  }

  public addVille(ville : Ville): Observable<Ville>{
    return this.http.post<Ville>(`${this.apiServerUrl}/addVille`,ville);
  } 

  public updateVille(ville : Ville) : Observable<Ville>{
    return this.http.put<Ville>(`${this.apiServerUrl}/updateVille`,ville);
  }

  public deleteVille(id : number): Observable<void>{
    return this.http.delete<void>(`${this.apiServerUrl}/deleteVille/${id}`);

  }
}
