import { Component, OnInit } from '@angular/core';
import { RemplacementService } from 'src/app/service/Remplacement/remplacement.service';
import { Remplacemnt } from 'src/app/Interface/IRemplacement';
import { NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: 'app-rattrapage',
  templateUrl: './rattrapage.component.html',
  styleUrls: ['./rattrapage.component.css']
})
export class RattrapageComponent implements OnInit {
  title = 'datatables';
  dtOptions: {};
  listEnsiegnants: any;
  sprinerName:string;
  isHidden: boolean = true;
  nomEnsiegnant: any;
  idEnsiegnant: any;
  listSeance: any;
  listFreeSalle: any;
  listAbcenses: any;
  rattrapage: Remplacemnt;
  rattrapages: Remplacemnt[];
  now = new Date().getFullYear() + '-' + String(new Date().getMonth() + 1).padStart(2, '0') + '-' + String(new Date().getDate()).padStart(2, '0');


  constructor(private rattraService: RemplacementService,private spinner: NgxSpinnerService) {
    this.sprinerName='sp1';
   }

  ngOnInit(): void {
    this.getAllRattrapage();
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      lengthMenu: [5, 10, 25],
      processing: true,
      dom: 'fBtp',
      buttons: [
        {
          text: '<i class="fas fa-plus"></i>',
          action:  ()=> {
            (<any>$('#add')).modal('show');
          }
        }
      ]
    };
  }
  getEnsiegnantsbyName() {
    this.rattraService.getEnseignantsbyName(this.nomEnsiegnant).subscribe(data => {
      this.isHidden = true;
      this.listEnsiegnants = data,
      this.idEnsiegnant = null;
    },err=>{
      this.idEnsiegnant = null;
    })
  }
  getInfEnsi(nom, id) {
    this.isHidden = false;
    this.nomEnsiegnant = nom;
    this.idEnsiegnant = id;
    this.getAbcensesNonVerifier();
  }
  getSeance() {
   this.rattraService.getSeance().subscribe(data => {
      this.listSeance = data;
    })
   // console.log(idAbsence)
  }
  getFreeSalle(dateRatt, idSeance) {
    this.rattraService.getFreeSalle(dateRatt, idSeance).subscribe(data => {
      this.listFreeSalle = data;
    })
  }
  addRattrapage(pre) {
    this.rattrapage = {
      idEnsiegnant: this.idEnsiegnant,
      dateAbsence: null,
      idNiveau: 0,
      idSeanceAbsence: 0,
      dateRatt: pre.dateRatt,
      idSalle: pre.idSalle,
      idSeance: pre.idSeance,
      idAbsence: pre.idAbsence
    }
    this.rattraService.addRattrapage(this.rattrapage).subscribe(data => {
      //this.getAllPreRatt();
      (<any>$('#add')).modal('hide');
      $("#addpre").trigger("reset");
      this.nomEnsiegnant = [];
      this.listEnsiegnants = [];
      this.listSeance = [];
      this.listAbcenses = [];
      this.listFreeSalle = [];
      this.idEnsiegnant = [];
      this.rattrapage = null;
      this.getAllRattrapage();
    });
  }
  getAbcensesNonVerifier() {
    this.rattraService.getAbcensesNonVerifier(this.idEnsiegnant).subscribe(data => {
      this.listAbcenses = data;
    });
  }
  getAllRattrapage() {
    this.spinner.show(this.sprinerName);
    this.rattraService.getAllRattrapage().subscribe(data => {
      this.rattrapages = data;
      setTimeout(() => {
        // spinner ends after 5 seconds 
        this.spinner.hide(this.sprinerName);
      }, 800);
    })
  }
}
