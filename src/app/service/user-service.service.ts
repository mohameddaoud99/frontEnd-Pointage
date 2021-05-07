import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { User } from '../Interface/IUser';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  private uri:String="http://localhost:9191/user/";
  constructor(private http:HttpClient,private route:Router) { }
  getUsers():Observable<User[]>
  {
    return this.http.get<User[]>(this.uri+"getUsers");
  }
  deleteUser(id)
  {
    return this.http.delete(this.uri+"deleteUser/"+id);
  }
  addNewUser(u:User)
  {
    return this.http.post(this.uri+"createUser",u);
  }
  updatePassword( u:User)
  {
    return this.http.post(this.uri+"updatePassword",u);
  }
  getUser():Observable<User>
  {
    return this.http.get<User>(this.uri+"getUser");
  }
  ChangeInfoPersonneller(infoPer)
  {
    return this.http.post(this.uri+"ChangeInfoPer",infoPer);
  }
  ChangePassword(info)
  {
    return this.http.post(this.uri+"ChangePassword",info);
  }
  ChangeEmail(info)
  {
    return this.http.post(this.uri+"ChangeEmail",info);
  }

}
