import { Component, OnInit, Input, Inject, Output, EventEmitter, SimpleChange } from '@angular/core';
import { Local } from '../models/Local';
import { LocalService } from '../services/local.service';
import { WebLocalService } from '../services/web-local.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog'
import { Subject } from 'rxjs';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  @Input() local: Local
  summaryProductList: Array<{name: any, price: number, quantity: number}> = [];
  totalCost: number = 0;
  numberValue: number = 0;

  constructor(@Inject(MAT_DIALOG_DATA) public data: ModalComponent,
              private localService: LocalService)
  { }

  ngOnInit(): void {
    
  }

  addProductToSummary(product, method: string, i, j){
    this.localService.updateSummaryProductList(product, method)
  }

  removeProductFromSummary(product, method: string){
    this.localService.updateSummaryProductList(product, method)
  }

}
