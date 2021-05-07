import { Component, OnInit } from '@angular/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { BlockService } from 'src/app/service/block.service';
import { Block } from 'src/app/Interface/IBlock';
import { NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: 'app-block',
  templateUrl: './block.component.html',
  styleUrls: ['./block.component.css']
})
export class BlockComponent implements OnInit {
  title = 'datatables';
  dtOptions: {};
  listEtage:Block[];
  selectedItems = [];
  sprinerName:string;
  itemSelected:number;
  listBlock:any;
  listSalle:any;
  dropdownSettings :IDropdownSettings;
  etage:any={
    "idBlock":null,
    "nomEtage":null,
    "salles":{}
  }
  message = '';

  constructor(private blockser:BlockService,private spinner: NgxSpinnerService) { 
    this.sprinerName='sp1';
  }

  ngOnInit() {
    this.getAllEtage()
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'nom_salle',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 50,
      allowSearchFilter: true
    };
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      lengthMenu: 5,
      processing: true,
      responsive: true,
      select: true,
      dom: 'fBtp',
      buttons: [
        {
          text: '<i class="fas fa-plus"></i>',
          className: 'add-button',
          action:  ()=> {
            this.getAllBlock();
            this.getAllSalle();
            (<any>$('#addEtage')).modal('show');
          }
        },
        {
          text: '<i class="fas fa-trash"></i>',
          className: 'remove-button disabled',
          action:  ()=> {
            this.getAllBlock();
            this.getAllSalle();
            (<any>$('#deleteEtage')).modal('show');
          }
        },
        {
          text: '<i class="fas fa-wrench"></i>',
          className: 'update-button disabled',
          action:  ()=> {
            (<any>$('#addEtage')).modal('show');
          }
        }
      ],
      rowCallback: (row: Node, data: any[] | Object, index: number) => {
        const self = this;
        $('td', row).on('click', () => {
          if ( $('td', row).parent().hasClass('selected')==false) {
            this.itemSelected=data[0]
            $(".remove-button").removeClass("disabled");
            $(".update-button").removeClass("disabled");            
        }
        else {
          $(".remove-button").addClass("disabled")
          $(".update-button").addClass("disabled")
        }
        });
        return row;
      }
    };
  }
  getAllEtage()
  {
    this.spinner.show(this.sprinerName);
    this.blockser.getEtages().subscribe(data=>{
      this.listEtage=data;
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
    })
  }
  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }
  /*getAllDep()
  {
    this.blockser.getAlldepartements().subscribe(data=>{
      this.listDep=data;
    })
  }*/
  getAllBlock()
  {
    this.blockser.getAllBlock().subscribe(data=>{
      this.listBlock=data;
    })
  }
  getAllSalle()
  {
    this.blockser.getAllSalle().subscribe(data=>{
      this.listSalle=data;
    })
  }
  addEtage()
  {
    this.etage.salles=this.selectedItems;
    this.blockser.addEtage(this.etage).subscribe(data=>{
      this.getAllEtage();
      (<any>$('#addEtage')).modal('hide');
      $("#formAddEtage").trigger("reset");
      this.selectedItems = [];
    })
  }
  deleteEtage()
  {
    this.blockser.deleteEtage(this.itemSelected).subscribe(data=>{
      console.log(data);
      (<any>$('#deleteEtage')).modal('hide');
      this.getAllEtage();
    });
  }
  
}
