import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Block } from '../Interface/IBlock';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BlockService {
  private uri:String="http://localhost:9191/";
  constructor(private http:HttpClient) { }
  getEtages():Observable<Block[]>
  {
    return this.http.get<Block[]>(this.uri+"departement/etage");
  }
  getAlldepartements()
  {
    return this.http.get(this.uri+"departement/");
  }
  getAllBlock()
  {
    return this.http.get(this.uri+"departement/block");
  }
  getAllSalle()
  {
    return this.http.get(this.uri+"departement/salle");
  }
  addEtage(etage)
  {
    console.log(etage)
    return this.http.post(this.uri+"departement/addEtage",etage)
  }
  deleteEtage(idEtage)
  {
    console.log(idEtage)
    return this.http.get(this.uri+"departement/deleteEtage/"+idEtage)
  }
}
