import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  private uri:String="http://localhost:9191/user/";
  constructor(private http:HttpClient,private route:Router) { }
  login(log)
  {
    this.http.post(this.uri+"authenticate",log,{responseType: 'text'}).subscribe(data=>{
      localStorage.setItem("token",data)
      console.log(data);
      this.route.navigate(['/dashboard'])
    },
    err=>console.log(err));
  }
  isLogged()
  {
    return !!localStorage.getItem('token');
  }
}
