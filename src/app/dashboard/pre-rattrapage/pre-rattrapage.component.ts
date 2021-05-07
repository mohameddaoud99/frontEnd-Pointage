import { Component, OnInit } from '@angular/core';
import { Remplacemnt } from 'src/app/Interface/IRemplacement';
import { RemplacementService } from 'src/app/service/Remplacement/remplacement.service';
import { NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: 'app-pre-rattrapage',
  templateUrl: './pre-rattrapage.component.html',
  styleUrls: ['./pre-rattrapage.component.css']
})
export class PreRattrapageComponent implements OnInit {
  title = 'datatables';
  dtOptions: {}={};
  listPreRatt: Remplacemnt[];
  nomEnsiegnant: any;
  listEnsiegnants: any;
  sprinerName:string;
  isHidden: boolean = true;
  listGroups: any;
  listSeance: any;
  listSeanceAbcense: any;
  listFreeSalle: any;
  idEnsiegnant: any;
  rattrapage: Remplacemnt;
  
  
  constructor(private preService: RemplacementService,private spinner: NgxSpinnerService) {
    this.sprinerName='sp1';
  }
  ngOnInit() {
    this.getAllPreRatt();
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
    this.preService.getEnseignantsbyName(this.nomEnsiegnant).subscribe(data => {
      this.isHidden = true;
      this.listEnsiegnants = data
    })
  }
  getInfEnsi(nom, id) {
    this.isHidden = false;
    this.nomEnsiegnant = nom;
    this.idEnsiegnant = id;
    this.preService.getGroupbyEnsie(id).subscribe(data => {
      this.listGroups = data;
    })
  }
  getSeance() {
    this.preService.getSeance().subscribe(data => {
      this.listSeance = data;
    })
  }
  addPre(pre) {
    this.rattrapage = {
      idEnsiegnant: this.idEnsiegnant,
      dateAbsence: pre.dateAbsence,
      idNiveau: pre.idGroup,
      idSeanceAbsence: pre.idSeanceAbsence,
      dateRatt: pre.dateRatt,
      idSalle: pre.idSalle,
      idSeance: pre.idSeance,
      idAbsence:0
    }
    this.preService.addPreRattrapage(this.rattrapage).subscribe(data => {
      this.getAllPreRatt();
      (<any>$('#add')).modal('hide');
      $("#addpre").trigger("reset");
      this.nomEnsiegnant = [];
      this.listEnsiegnants = [];
      this.listGroups = [];
      this.listSeance = [];
      this.listSeanceAbcense = [];
      this.listFreeSalle = [];
      this.idEnsiegnant = [];
      this.rattrapage = null;
    });
  }
  getSeanceAbcense(idGroup) {
    this.preService.getSeanceAbcense(idGroup, this.nomEnsiegnant).subscribe(data => {
      this.listSeanceAbcense = data;
    });
  }
  getFreeSalle(dateRatt, idSeance) {
    this.preService.getFreeSalle(dateRatt, idSeance).subscribe(data => {
      this.listFreeSalle = data;
    })
  }
  getAllPreRatt() {
    this.spinner.show(this.sprinerName);
    this.preService.getAllPreRatt().subscribe(data => {
      this.listPreRatt = data;
      setTimeout(() => {
        // spinner ends after 5 seconds 
        this.spinner.hide(this.sprinerName);
      }, 800);
    },
    err=>{
      setTimeout(() => {
        // spinner ends after 5 seconds 
        this.spinner.hide(this.sprinerName);
      }, 800);
      console.log(err)
    });
  }
}
