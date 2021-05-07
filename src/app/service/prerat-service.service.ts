import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class PreratServiceService {
  private uri:String="http://localhost:9191/";
  constructor(private http:HttpClient) { }
  getEnseignantsbyName(name)
  {
    return this.http.get(this.uri+"ensiegnant/"+name);
  }
  getGroupbyEnsie(id)
  {
    return this.http.get(this.uri+"group/"+id);
  }
  getSeance()
  {
    return this.http.get(this.uri+"group/seance");
  }
  getSeanceAbcense(idGroup,nomEnsiegnant)
  {
    return this.http.get(this.uri+"ensiegnement/seanceAbsence/"+nomEnsiegnant+"/"+idGroup);
  }
  getFreeSalle(dateRatt,idSeance)
  {
    return this.http.get(this.uri+"gestionPre/freeSalle/"+dateRatt+"/"+idSeance);
  }
  addPreRattrapage(pre)
  {
    return this.http.post(this.uri+"gestionPre/addPreRattrapage",pre);
  }
  getAllPreRatt()
  {
    return this.http.get(this.uri+"gestionPre/");
  }
}
