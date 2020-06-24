import {Component, OnInit, Input, Inject, Output, EventEmitter, SimpleChange} from '@angular/core';
import {Local} from '../models/Local';
import {LocalService} from '../services/local.service';
import {WebLocalService} from '../services/web-local.service';
import {MAT_DIALOG_DATA} from '@angular/material/dialog'
import {Subject} from 'rxjs';
import {LocalDetailed} from '../models/LocalDetailed';
import {UserHistoryToAdd, UserHistoryToAddItem} from '../models/UserHistoryToAdd';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  @Input() local: LocalDetailed
  summaryProductList: Array<{ name: any, price: number, quantity: number }> = [];
  totalCost: number = 0;
  currentCost: number;
  numberValue: number = 0;
  localImage: any;
  checkedLocalsIdList: number[]
  getUserHistoryForLocal: UserHistoryToAddItem


  constructor(@Inject(MAT_DIALOG_DATA) public data: ModalComponent,
              private localService: LocalService,
              private webLocalService: WebLocalService
  ) {
    this.localService.getCheckedLocalsIdList()
      .subscribe(mymessage => {
        this.checkedLocalsIdList = mymessage;
      });

  }

  ngOnInit(): void {
    this.local.openingHours.schedule.sort((a, b) => a.orderNumber - (b.orderNumber));

    this.getUserHistoryForLocal = this.localService.getUserHistoryToAddForLocal(this.local.id)
    console.log("this.getUserHistoryForLocal")
    console.log(this.getUserHistoryForLocal)

    this.currentCost = this.localService.getCurrentCostForLocal(this.local.id)
  }


  addProductToSummary(product, method: string, i, j) {
    console.log(product)
    console.log(method)
    this.localService.updateSummaryProductListHistory(this.local.id, product, method)
    this.localService.updateSummaryProductList(product, method, i, j)
    const currenDrinkstArray = this.localService.getSummaryProductListValues();
    let index = currenDrinkstArray.findIndex(x => x.i === i && x.j === j);
    (<HTMLInputElement>document.getElementById("quantity" + i + j)).value = currenDrinkstArray[index].quantity.toString();
    this.currentCost += product.price;

  }

  removeProductFromSummary(product, method: string, i, j) {
    this.localService.updateSummaryProductListHistory(this.local.id, product, method)
    console.log(i + '' + j)
    this.localService.updateSummaryProductList(product, method, i, j);
    const currenDrinkstArray = this.localService.getSummaryProductListValues();
    let index = currenDrinkstArray.findIndex(x => x.i === i && x.j === j);

    if (currenDrinkstArray[index].quantity >= 0)
      (<HTMLInputElement>document.getElementById("quantity" + i + j)).value = currenDrinkstArray[index].quantity.toString();
    else
      (<HTMLInputElement>document.getElementById("quantity" + i + j)).value = "0"

    this.currentCost -= product.price;
  }

  getQuantityForProduct(productId) {
    switch (this.getUserHistoryForLocal) {
      case undefined:
        return 0
        break;
      default:
        const productExist = this.getUserHistoryForLocal.products.find(product => product.productId === productId)
        switch (productExist) {
          case undefined:
            return 0;
            break;
          default:
            return productExist.quantity
            break;
        }
    }
  }

  getCurrentPriceForLocal() {
    switch (this.getUserHistoryForLocal) {
      case undefined:
        return 0
        break;
      default:
        const productExist = this.getUserHistoryForLocal.products
        switch (productExist) {
          case undefined:
            return 0;
            break;
          default:
            /*
            this.getUserHistoryForLocal.products.forEach(product=>{
        this.local.menu.items.find(item=>item.products.
         find(productInMenu=>productInMenu.productId===product.productId))

           //   this.local.menu.items.
          //  })
           // this.getUserHistoryForLocal.products.forEach(product=>{
      //        this.local.menu.items.forEach(item=>item.)
           //   this.local.menu.items.find(item=>item.products.find(productL=>productL.productId===product))
      //      })
      //      product.quantity*this.local.menu.items.find(item=>item.products.find(product=>product.productId===)))
      //      return this.getUserHistoryForLocal.products.forEach(product=>

             */
            break;
        }
    }
  }

}
