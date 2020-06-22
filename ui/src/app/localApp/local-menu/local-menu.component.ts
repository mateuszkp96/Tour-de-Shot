import {Component, OnInit, Input} from '@angular/core';
import {Router} from '@angular/router';
import {WebLocalService} from '../../services/web-local.service';
import {MenuService} from '../../services/menu.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {MatDialog} from '@angular/material/dialog';
import {Product} from '../../models/Product';
import {LocalDetailed} from '../../models/LocalDetailed';
import {ProductAddModalComponent} from '../product-add-modal/product-add-modal.component';
import {ProductModifyModalComponent} from '../product-modify-modal/product-modify-modal.component';
import {TreeComponent} from 'src/app/tree/tree.component';
import * as fromLocalLogin from '../../state/localLogin.reducer';
import * as localLoginActions from '../../state/localLogin.actions';
import {Store, select} from '@ngrx/store';
import {LocalLoginService} from 'src/app/services/local-login.service';
import { CategoryHeaderAddModalComponent } from '../category-header-add-modal/category-header-add-modal.component';

@Component({
  selector: 'app-local-menu',
  templateUrl: './local-menu.component.html',
  styleUrls: ['./local-menu.component.css']
})
export class LocalMenuComponent implements OnInit {

  localId: number = null
  local: LocalDetailed
  productToAdd: Product
  tree: TreeComponent
  isCollapsed: boolean

  constructor(
    private router: Router,
    private webLocalService: WebLocalService,
    private menuService: MenuService,
    private modalService: NgbModal,
    public dialog: MatDialog,
    private store: Store<fromLocalLogin.AppState>,
    private localLoginService: LocalLoginService
  ) {
    /*
    this.store.pipe(select(fromLocalLogin.getLocalId)).subscribe(
      async id => {
        if (id) {
          console.log("From menu" + id)
          this.localId = id; // hardcoded here yet
          this.getLocal(this.localId)    //todo: changing to appropriate local
        }
      });

     */
  }


  ngOnInit(): void {
  //  this.localId = this.localLoginService.getIdValue()
    this.localId = 2
    if (this.localId) {
      this.getLocal(this.localId)
    }
    this.productToAdd = new Product()
    this.isCollapsed = false

    console.log( this.localId)
  }


  getLocal(id: number) {
    this.webLocalService.getLocalById(id).then(local =>
      this.local = local)
  }

  getLocalMenu(id: number) {
    this.menuService.getMenu(id).then(menu =>
      this.local.menu = menu)
  }

  onAddProductClick(orderNumber: number, categoryHeader: string) {
    const dialogRef = this.dialog.open(ProductAddModalComponent);
    dialogRef.componentInstance.orderNumber = orderNumber
    dialogRef.componentInstance.categoryHeader = categoryHeader

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.getLocalMenu(this.localId)
    });
  }

  removeProduct(product: Product) {
    console.log("Product remove")
  }

  modifyProduct(product: Product, i: number, j: number) {
    console.log("Modify product")
    const dialogRef = this.dialog.open(ProductModifyModalComponent);
    dialogRef.componentInstance.productToModify = product

    dialogRef.afterClosed().subscribe(result => {
      console.log("Dialog close");
      this.getLocalMenu(this.localId)
    });
  }

  onAddCategoryHeaderClick(){
    console.log("Add Category Header")
    const dialogRef = this.dialog.open(CategoryHeaderAddModalComponent);
  //  dialogRef.componentInstance.productToModify = product

    dialogRef.afterClosed().subscribe(result => {
      console.log("Dialog close");
      this.getLocalMenu(this.localId)
    });
  }

  modifyCategoryHeader(item: any){
    console.log("Modify category")
  }

  removeCategoryHeader(orderNumber:number){

  }
}
