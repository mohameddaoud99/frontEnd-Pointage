import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular'; // useful for typechecking
import { CalendarService } from 'src/app/service/calendar.service';
import { ToastrService } from 'ngx-toastr';
import { AnneeUniv } from 'src/app/Interface/IAnneeUniv';
import { auto } from '@popperjs/core';
import { NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  anneeUniv: AnneeUniv;
  events: any;
  idEvent: number;
  sprinerName:string;
  calendarOptions: CalendarOptions = {
    themeSystem: 'bootstrap4',
    height:auto,
    initialView: 'dayGridMonth',
    titleFormat: { year: 'numeric', month: 'long', day: 'numeric' },
    customButtons: {
      myCustomButton: {
        icon:"fa fas fa-plus",
        click: function () {
          (<any>$('#addEvent')).modal('show');
        }
      },
      mySetting: {
       // text: "Parametre",
       icon:'fa fas fa-cogs',
        click: function () {
          (<any>$('#calendarSetting')).modal('show');
        }
      }
    },
    //eventColor: '#378006', color of event
    eventClick: function (info): void {
      (<any>$('#idEvent')).val(info.event.id);
      (<any>$('#delete')).modal('show');
      info.el.style.borderColor = 'red';
    },
    locale: 'fr',
    headerToolbar: {
      left: 'prev,next',
      center: 'title',
      right: 'myCustomButton,mySetting'
    }
  };
  constructor(private calendarSer: CalendarService, private toastr: ToastrService,private spinner: NgxSpinnerService) { 
    this.sprinerName='sp1';
  }

  ngOnInit(): void {
    this.getAllEvent();
  }
  getAllEvent() {
    this.spinner.show(this.sprinerName);
    this.calendarSer.getAllEvents().subscribe(data => {
      this.anneeUniv = data;
      if (this.anneeUniv) {
        this.events = this.anneeUniv.events;
        this.calendarOptions.events = this.events;
      }
      setTimeout(() => {
        this.spinner.hide(this.sprinerName);
      }, 800);

    })
  }
  addEvent(event) {
    this.calendarSer.addEvent(event, this.anneeUniv.idAnneeUnvi).subscribe(data => {
      this.getAllEvent();
      (<any>$('#addEvent')).modal('hide');
      $("#add").trigger("reset");
      this.toastr.success("ajoutee ", 'Réussir');
    },
      err => {
        this.toastr.error(err.error.message, 'Erreur');
      });
  }
  deleteEvent() {
    this.calendarSer.deleteEvent((<any>$('#idEvent')).val()).subscribe(data => {
      this.getAllEvent();
      (<any>$('#delete')).modal('hide');
    },
      err => {
        this.toastr.error(err.error.message, 'Erreur');
      });
  }
  addAnneeUnvi(annee) {
    this.calendarSer.addAnneeUnvi(annee).subscribe((data) => {
      this.toastr.success("ajoutee ", 'Réussir');
      this.getAllEvent();
    },
      err => {
        this.toastr.error(err.error.message, 'Erreur');
      });
  }
}
