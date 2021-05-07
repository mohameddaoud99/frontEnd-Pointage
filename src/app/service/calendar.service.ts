import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AnneeUniv } from '../Interface/IAnneeUniv';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CalendarService {
  private uri:String="http://localhost:9191/";
  constructor(private http:HttpClient) { }
  getAllEvents():Observable<AnneeUniv>
  {
    return this.http.get<AnneeUniv>(this.uri+"calendar/");
  }
  addEvent(event,idAnneeUnvi)
  {
    return this.http.post(this.uri+"calendar/add/"+idAnneeUnvi,event);
  }
  deleteEvent(id)
  {
    return this.http.get(this.uri+"calendar/delete/"+id);
  }
  addAnneeUnvi(annee)
  {
    return this.http.post(this.uri+"calendar/addAnneeUnvi",annee);
  }
}
