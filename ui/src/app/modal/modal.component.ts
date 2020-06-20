import { Component, OnInit, Input, Inject, Output, EventEmitter, SimpleChange } from '@angular/core';
import { Local } from '../models/Local';
import { LocalService } from '../services/local.service';
import { WebLocalService } from '../services/web-local.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  @Input() local: Local;
  summaryProductList: Array<{name: any, price: number, quantity: number}> = [];
  totalCost = 0;
  currentQuantity: Array<{index1: any, index2: any, cquantity: number}> = [];
  // numberValue:number =  0;

  constructor(@Inject(MAT_DIALOG_DATA) public data: ModalComponent,
              private localService: LocalService) { }

  ngOnInit(): void {

  }


  addProductToSummary(product, method: string, i, j) {
    this.localService.updateSummaryProductList(product, method, i, j);
    const currentDrinksArray = this.localService.getSummaryProductListValues();
    const index = currentDrinksArray.findIndex(x => x.i === i && x.j === j);
    (document.getElementById('quantity' + i + j) as HTMLInputElement).value = currentDrinksArray[index].quantity.toString();
  }


  removeProductFromSummary(product, method: string, i, j) {
    this.localService.updateSummaryProductList(product, method,  i, j);
  }
}
