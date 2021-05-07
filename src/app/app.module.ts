import { BrowserModule } from '@angular/platform-browser';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthGuard } from './auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PreRattrapageComponent } from './dashboard/pre-rattrapage/pre-rattrapage.component';
import { UserComponent } from './dashboard/user/user.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import {DataTablesModule} from 'angular-datatables';
import { FullCalendarModule } from '@fullcalendar/angular'; // the main connector. must go first
import dayGridPlugin from '@fullcalendar/daygrid';
import { CalendarComponent } from './dashboard/calendar/calendar.component';
import { BlockComponent } from './dashboard/block/block.component'; // a plugin;
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { RattrapageComponent } from './dashboard/rattrapage/rattrapage.component';
import { ProfilComponent } from './dashboard/profil/profil.component';
import { NgxSpinnerModule } from "ngx-spinner";

FullCalendarModule.registerPlugins([ // register FullCalendar plugins
  dayGridPlugin
  
]);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    PreRattrapageComponent,
    UserComponent,
    CalendarComponent,
    BlockComponent,
    RattrapageComponent,
    ProfilComponent
],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut:6000,
      positionClass:'toast-bottom-right',
      preventDuplicates:false,
    }),
    DataTablesModule,
    FullCalendarModule ,
    NgMultiSelectDropDownModule.forRoot(),
    NgxSpinnerModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
