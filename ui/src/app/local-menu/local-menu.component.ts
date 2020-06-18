import {Component, OnInit, Input} from '@angular/core';
import {Router} from '@angular/router';
import { MenuAddModalComponent } from '../menu-add-modal/menu-add-modal.component';
import { InitialMenuItem } from '../models/InitialMenuItem';
import { WebLocalService } from '../services/web-local.service';
import { MenuService } from '../services/menu.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MatDialog } from '@angular/material/dialog';
import { Product } from '../models/Product';
import { LocalDetailed } from '../models/LocalDetailed';
import { ProductAddModalComponent } from '../localApp/product-add-modal/product-add-modal.component';
import { ProductModifyModalComponent } from '../localApp/product-modify-modal/product-modify-modal.component';

@Component({
  selector: 'app-local-menu',
  templateUrl: './local-menu.component.html',
  styleUrls: ['./local-menu.component.css']
})
export class LocalMenuComponent implements OnInit {

  @Input() localId: number
  local: LocalDetailed
  productToAdd: Product

  constructor(
    private router: Router,
    private webLocalService: WebLocalService,
    private menuService: MenuService,
    private modalService: NgbModal,
    public dialog: MatDialog,
  ) {
  }

  ngOnInit(): void {
    this.localId = 2; // hardcoded here yet

    console.log(this.localId)
    this.getLocal(this.localId)    //todo: changing to appropriate local
    this.productToAdd = new Product()


  }

  getLocal(id: number){
    this.webLocalService.getLocalById(id).then(local=>
      this.local = local)
  }

  //onAddReportClick(modal) {
  //  this.modalService.open(modal, {ariaLabelledBy: 'modal-basic-title'});
  //}

  onAddProductClick(categoryHeader: string) {
    const dialogRef = this.dialog.open(ProductAddModalComponent);
    //console.log(this.local)
    dialogRef.componentInstance.categoryHeader = categoryHeader
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  removeProduct(product: Product){
    console.log("Product remove")
  }

  modifyProduct(product: Product, i: number, j: number){
    console.log("Product modify")
    const dialogRef = this.dialog.open(ProductModifyModalComponent);
    //console.log(this.local)
    dialogRef.componentInstance.productToModify = product
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  onAddMenuItemClick(){
    console.log("Add menu category clicked")
    const dialogRef = this.dialog.open(MenuAddModalComponent);
    //console.log(this.local)
   // dialogRef.componentInstance.productToModify = product
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}
