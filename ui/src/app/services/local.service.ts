import {Injectable} from '@angular/core';
import {HttpClientModule, HttpClient} from '@angular/common/http';
import {WebLocalService} from './web-local.service';
import {Local} from '../models/Local';
import {Subject, Observable} from 'rxjs';

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
  summaryProductList: Array<{ name: any, price: number, quantity: number }> = [];
  totalCost: number = 0;


  constructor(private webLocalService: WebLocalService) {

  }

  async getLocalsList() {
    /*
    await this.webLocalService.getLocalsJson().then(data => {
      this.localsList = data["content"]
    });

    return this.localsList

     */
    await this.webLocalService.getLocalsJson();
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

  updateSummaryProductList(selectedProduct, method) {
    const name = selectedProduct.productName
    const price = selectedProduct.price
    let quantity;
    const productExistInSummary = this.summaryProductList.find(el => el.name === name);

    switch (method) {
      case "add":
        if (!productExistInSummary) {
          quantity = 1
          this.summaryProductList.push({name, price, quantity})
        } else {
          productExistInSummary.quantity += 1;
        }
        this.totalCost += selectedProduct.price
        console.log(this.summaryProductList)
        break
      case "remove":
        if (!productExistInSummary) {
          console.log('Brak itemu')
        } else {
          productExistInSummary.quantity -= 1;
        }
        this.totalCost -= selectedProduct.price
        console.log(this.summaryProductList)
        break

    }
  }

  getSummaryProductListValues() {
    return this.summaryProductList;
  }

  getTotalCost() {
    return this.totalCost
  }

}
