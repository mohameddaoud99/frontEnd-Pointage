import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/Interface/IUser';
import { UserServiceService } from 'src/app/service/user-service.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  title = 'datatable';
  dtOptions:  {};
  listUsers: User[];
  sprinerName:string;
  pass =
    {
      password: null,
      repPassword: null,
    }
  user:User;
  constructor(private userService: UserServiceService,private toastr: ToastrService,private spinner: NgxSpinnerService) 
  {
    this.sprinerName='sp1';
  }

  ngOnInit() {
    this.spinner.show(this.sprinerName);
    this.getUsers();
    this.jqry();
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      lengthMenu: [5, 10, 25],
      processing: true,
      dom: 'fBtp',
      buttons: [
        {
          text: '<i class="fas fa-user-plus"></i>',
          action:  ()=> {
            (<any>$('#addUser')).modal('show');
          }
        }
      ]
    };
  }
  getUsers() {
    this.userService.getUsers().subscribe(data => {
      this.listUsers = data;
      setTimeout(() => {
        // spinner ends after 5 seconds 
        this.spinner.hide(this.sprinerName);
      }, 800);
    },
      err => {
        setTimeout(() => {
          // spinner ends after 5 seconds 
          this.spinner.hide(this.sprinerName);
        }, 800);
        console.log(err);
      });
  }
  deleteUser(id) {
    this.userService.deleteUser(id).subscribe(data => {
      this.getUsers();
      this.toastr.success('utilisateur supprimier avec succès','réussir');
    },
      err => {
        console.log(err);
      });
  }
  jqry() {
    $(document).ready(function () {
      $("#dep").hide();
      $("#role").change(function () {
        var r = $("#role").val();
        if (r == "Responsable") {
          $("#dep").show();
        }
        else {
          $("#dep").hide();
        }
      });
    })
  }
  async addUser(user) {
    this.userService.addNewUser(user).subscribe(suc => {
      $(".close").click();
      $("#formAddUser").trigger("reset");
      this.toastr.success('Utilisateur ajouter avec succès','Réussir');
      this.getUsers();
    },
    err=>{
      this.toastr.error(err.error.message,'Erreur');
    });
  }
  async updatePassword()
  {
    this.user.password=this.pass.password;
    this.userService.updatePassword(this.user).subscribe(succ=>{
      this.toastr.success('Changer avec succès','Réussir');
      $(".close").click();
      $("#changePass").trigger("reset");
    },
    err=>{
      console.log("fff");
    });
  }
  getUser(u:User)
  {
    this.user=u;
  }
}
