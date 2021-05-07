import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';
import { PreRattrapageComponent } from './dashboard/pre-rattrapage/pre-rattrapage.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserComponent } from './dashboard/user/user.component';
import { CalendarComponent } from './dashboard/calendar/calendar.component';
import { BlockComponent } from './dashboard/block/block.component';
import { RattrapageComponent } from './dashboard/rattrapage/rattrapage.component';
import { ProfilComponent } from './dashboard/profil/profil.component';


const routes: Routes = [
 /* {
    path:'dashbord',component:DashbordComponent,
    canActivate:[AuthGuard]
  },*/
  {
    path:'',component:LoginComponent
  },
  {
    path:'dashboard',component:DashboardComponent,
    //canActivate:[AuthGuard],
    children:[
      {path:"preRattrapage",component:PreRattrapageComponent},
      {path:"rattrapage",component:RattrapageComponent},
      {path:"calendar",component:CalendarComponent},
      {path:"user",component:UserComponent},
      {path:"block",component:BlockComponent},
      {path:"profil",component:ProfilComponent},
    ]
  },
  {
    path:"**",component:LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
