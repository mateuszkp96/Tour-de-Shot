import {Component, OnInit, Input} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
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
import {CategoryHeaderAddModalComponent} from '../category-header-add-modal/category-header-add-modal.component';
import {CategoryHeaderModifyModalComponent} from '../category-header-modify-modal/category-header-modify-modal.component';
import {ProductService} from 'src/app/services/product.service';

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
  menuIsEmpty: boolean = false

  constructor(
    private router: Router,
    private webLocalService: WebLocalService,
    private menuService: MenuService,
    private modalService: NgbModal,
    public dialog: MatDialog,
    private store: Store<fromLocalLogin.AppState>,
    private localLoginService: LocalLoginService,
    private productService: ProductService,
    private route: ActivatedRoute,
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
    //   this.localId = Number(this.route.snapshot.params.id);
    //console.log(this.localId)

    if (this.localId) {
      this.getLocal(this.localId)
    }
    this.productToAdd = new Product()
    this.isCollapsed = false

    console.log(this.localId)
  }


  getLocal(id: number) {
    this.webLocalService.getLocalById(id).then(local => {
      this.local = local
      if (!this.local.menu)
        this.menuIsEmpty = true
    });
  }

  getLocalMenu(id: number) {
    this.menuService.getMenu(id).then(menu => {
      this.local.menu = menu
      if (this.local.menu.items.length == 0)
        this.menuIsEmpty = true
    });
  }

  onAddProductClick(orderNumber: number, categoryHeader: string) {
    const dialogRef = this.dialog.open(ProductAddModalComponent);
    dialogRef.componentInstance.orderNumber = orderNumber
    dialogRef.componentInstance.categoryHeader = categoryHeader
    dialogRef.componentInstance.localId = this.local.id


    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.getLocalMenu(this.localId)
    });
  }

  onDeleteProduct(product: Product, orderNumber: number) {
    console.log("Delete product")
    console.log(product.name)

    this.productService.deleteProduct(this.localId, orderNumber, product.productId).then(() =>
      this.getLocalMenu(this.localId))
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


  onAddCategoryHeaderClick() {
    console.log("Add Category Header")
    const dialogRef = this.dialog.open(CategoryHeaderAddModalComponent);
    dialogRef.componentInstance.localId = this.localId

    dialogRef.afterClosed().subscribe(result => {
      console.log("Dialog close");
      this.getLocalMenu(this.localId)
    });
  }

  onModifyCategoryHeader(item: any) {
    console.log("Add Category Header")
    const dialogRef = this.dialog.open(CategoryHeaderModifyModalComponent);
    dialogRef.componentInstance.categoryHeader = item.categoryHeader
    dialogRef.componentInstance.localId = this.localId
    dialogRef.componentInstance.orderNumber = item.orderNumber


    dialogRef.afterClosed().subscribe(result => {
      console.log("Dialog close");
      this.getLocalMenu(this.localId)
    });
  }

  onDeleteCategoryHeader(orderNumber: number) {
    console.log("Delete Category Header")
    this.menuService.deleteCategoryHeader(this.localId, orderNumber).then(() =>
      this.getLocalMenu(this.localId))
  }

  onBackClick() {
    this.router.navigate(['locals']);
  }

  onCreateMenuClick(){
    this.menuService.addEmptyMenu(this.localId)
    this.menuIsEmpty = false
    this.getLocal(this.localId)
  }
}
