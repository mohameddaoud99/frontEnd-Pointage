import { Component, OnInit } from '@angular/core';
import { UserServiceService } from 'src/app/service/user-service.service';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/Interface/IUser';
import { NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {
  user:any;
  sprinerName:string;
  constructor(private userService: UserServiceService,private toastr: ToastrService,private spinner: NgxSpinnerService) {
    this.sprinerName='sp1';
   }

  ngOnInit(): void {
    
    this.getUser();
  }
  public getUser()
  {
    this.spinner.show(this.sprinerName);
    this.userService.getUser().subscribe(data=>{
      this.user=data;
      setTimeout(() => {
        this.spinner.hide(this.sprinerName);
      }, 800);
    })
  }
  ChangeInfoPersonneller(infoPer)
  {
    let user1={
      id:this.user.id,
      nom:infoPer.nom,
      prenom:infoPer.prenom
    }
    this.userService.ChangeInfoPersonneller(user1).subscribe(()=>{
      this.getUser();
      this.toastr.success('Modifier avec succès','Réussir');
    })
  }
  ChangePassword(value )
  {
    let user1={
      id:this.user.id,
      password:value.actuelPassword,
      newPassword:value.newPassword
    }
    console.log(user1)
    this.userService.ChangePassword(user1).subscribe((data)=>{
      console.log(data)
    },err=>{
      console.log(err)
    })
  }
  changeEmail(value)
  {
    let user1={
      id:this.user.id,
      userName:value.email,
      password:value.password
    }
    console.log(value)
    this.userService.ChangeEmail(user1).subscribe((data)=>{
      $("#changeEml").trigger("reset");
      this.getUser();
      console.log(data)
    },err=>{
      console.log(err)
    })
  }

}
