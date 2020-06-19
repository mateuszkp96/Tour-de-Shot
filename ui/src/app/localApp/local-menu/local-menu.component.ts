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
import * as cloneDeep from 'lodash/cloneDeep';

@Component({
  selector: 'app-local-menu',
  templateUrl: './local-menu.component.html',
  styleUrls: ['./local-menu.component.css']
})
export class LocalMenuComponent implements OnInit {

  @Input() localId: number
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
  ) {
  }

  ngOnInit(): void {
    this.localId = 2; // hardcoded here yet

    console.log(this.localId)
    this.getLocal(this.localId)    //todo: changing to appropriate local
    this.productToAdd = new Product()
    this.isCollapsed = false
  }

  getLocal(id: number) {
    this.webLocalService.getLocalById(id).then(local =>
      this.local = local)
  }

  getLocalMenu(id: number) {
    this.menuService.getMenu(id).then(menu =>
      this.local.menu = menu)
  }

  onAddProductClick() {
    const dialogRef = this.dialog.open(ProductAddModalComponent);
    //console.log(this.local)
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
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
  

}
