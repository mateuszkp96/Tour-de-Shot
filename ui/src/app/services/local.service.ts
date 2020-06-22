import {Injectable} from '@angular/core';
import {HttpClientModule, HttpClient} from '@angular/common/http';
import {WebLocalService} from './web-local.service';
import {Local} from '../models/Local';
import {Subject, Observable} from 'rxjs';
import {
  UserHistoryToAdd,
  InitUserHistoryToAdd,
  InitUserHistoryToAddItem,
  InitUserHistoryToAddProduct,
  UserHistoryToAddItem,
  UserHistoryToAddProduct,
} from '../models/UserHistoryToAdd';

@Injectable({
  providedIn: 'root'
})
export class LocalService {

  filteredByDistLocalsList = new Subject<Local[]>();
  private checkedLocalsIdList = new Subject<number[]>();
  private checkedLocalsIdListValues: number[] = [];
  private checkedLocalsListValues: Local[] = [];
  private filteredByDistLocalsListValues: Local[] = [];
  local: Local;
  localsList: Local[]
  summaryProductList: Array<{name: any, price: number, i: number, j:number, quantity: number}> = [];
  totalCost: number = 0;
  orderNumber = 0;
  private checkedCategories = new Subject<string[]>();
  currentCheckedCategories = this.checkedCategories.asObservable();
  userHistoryToAdd = InitUserHistoryToAdd


  constructor(private webLocalService: WebLocalService) {
    this.userHistoryToAdd.items = []
    this.userHistoryToAdd.name = ""
  }

  async getLocalsList() {
    await this.webLocalService.getLocalsJson().then(data => {
      this.localsList = data["content"]
    });

    return this.localsList

  }


  getFilteredByDistLocalsList(): Observable<Local[]> {
    return this.filteredByDistLocalsList.asObservable();
  }

  updateFilteredByDistLocalsList(localsList: Local[]) {
    this.filteredByDistLocalsList.next(localsList);
    this.filteredByDistLocalsListValues = localsList;
  }


  getCheckedLocalsIdList(): Observable<number[]> {
    return this.checkedLocalsIdList.asObservable();
  }

  updateCheckedLocalsIdList(checkedlocalsList: number[]) {
    this.checkedLocalsIdList.next(checkedlocalsList);
    this.checkedLocalsIdListValues = checkedlocalsList;
  }

  getFilteredByDistLocalsListValues() {
    return this.filteredByDistLocalsListValues;
  }

  getCheckedLocalsIdListValues() {
    return this.checkedLocalsIdListValues;
  }

  updateSummaryProductList(selectedProduct, method, i, j){
    const name = selectedProduct.name
    const price = selectedProduct.price
    let quantity;
    const productExistInSummary = this.summaryProductList.find(el => el.name === name);

    switch(method){
      case "add":
        if(!productExistInSummary){
          quantity = 1
          this.summaryProductList.push({name, price, i, j, quantity})
        } else {
          productExistInSummary.quantity += 1;
        }
        this.totalCost += selectedProduct.price
        console.log(this.summaryProductList)
        break
      case "remove":
        if(!productExistInSummary){
          console.log('Brak itemu')
        } else {
          productExistInSummary.quantity -= 1;
        }
        this.totalCost -= selectedProduct.price
        console.log(this.summaryProductList)
        break
    }
  }
  
  updateSummaryProductListHistory(localId, selectedProduct, method) {
    const localExist = this.userHistoryToAdd.items.find(item => item.localId === localId)
    const productExist = this.userHistoryToAdd.items.filter(item => item.localId === localId).find(item => item.products.find(product => product.productId === selectedProduct.productId))

    switch (method) {
      case "add":
        switch (localExist) {
          case undefined:
            //console.log("NIE MA TEGO LOKALU DLA DODAWANIA")
            let userHistoryToAddItem = new UserHistoryToAddItem()
            userHistoryToAddItem.products = []
            let userHistoryToAddProduct = new UserHistoryToAddProduct()
            userHistoryToAddProduct.productId = selectedProduct.productId
            userHistoryToAddProduct.quantity = 1
            userHistoryToAddItem.localId = localId
            this.orderNumber += 1
            userHistoryToAddItem.orderNumber = this.orderNumber
            userHistoryToAddItem.products.push(userHistoryToAddProduct)
            this.userHistoryToAdd.items.push(userHistoryToAddItem)
            console.log(this.userHistoryToAdd.items)
            break

          default:
            //console.log("JEST TEN LOKAL DLA DODAWANIA")
            switch (productExist) {
              case undefined:
                //console.log("Nie ma tego produktu")
                let userHistoryToAddItem = new UserHistoryToAddItem()
                let userHistoryToAddProduct = new UserHistoryToAddProduct()
                userHistoryToAddProduct.productId = selectedProduct.productId
                userHistoryToAddProduct.quantity = 1
                localExist.products.push(userHistoryToAddProduct)
                console.log((this.userHistoryToAdd.items))

                break;
              default:
                //console.log("Jest już ten produkt")
                let product = localExist.products.find(product => product.productId === selectedProduct.productId).quantity += 1
                console.log((this.userHistoryToAdd.items))
                break;
            }
        }
        this.totalCost += selectedProduct.price
        console.log("TOTAL COST: " + this.totalCost)
        break;
      case "remove":
        switch (localExist) {
          case undefined:
            //console.log("NIE MA TEGO LOKALU DLA REMOVE")
            break;
          default:
            //console.log("JEST TEN LOKAL DLA REMOVE")
            switch (productExist) {
              case undefined:
                //console.log("Nie ma tego produktu")
                break;
              default:
                //console.log("Jest już ten produkt")
                let product = localExist.products.find(product => product.productId === selectedProduct.productId)
                if (product.quantity > 0)
                  product.quantity -= 1
                if (product.quantity == 0) {
                  const index = localExist.products.indexOf(product)
                  localExist.products.splice(index, 1);
                }
                if (localExist.products.length == 0) {
                  const index = this.userHistoryToAdd.items.indexOf(localExist)
                  this.userHistoryToAdd.items.splice(index, 1);
                }
                console.log((this.userHistoryToAdd.items))
                this.totalCost -= selectedProduct.price
                console.log("TOTAL COST: " + this.totalCost)
                break;
            }
            break;
        }
        break;
    }
  }

  getSummaryProductListValues() {
    return this.summaryProductList;
  }

  getTotalCost() {
    return this.totalCost
  }

  getUserHistoryToAdd() {
    return this.userHistoryToAdd
  }

  updateCheckedCategories(currentCheckedCategories
                            :
                            string[]
  ) {
    this.checkedCategories.next(currentCheckedCategories)
  }

  getCurrentCheckedCategories() {
    return this.currentCheckedCategories
  }

}
