import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from'../service/auth-service.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private auth:AuthServiceService,private toastr: ToastrService) { }

  ngOnInit(): void {
  }
  login(val)
  {
    this.auth.login(val);
  }
}
