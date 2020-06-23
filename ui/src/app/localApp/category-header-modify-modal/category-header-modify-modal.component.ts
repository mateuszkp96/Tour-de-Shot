import {Component, OnInit, Inject, Input} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ProductAddModalComponent} from '../product-add-modal/product-add-modal.component';
import {MenuService} from 'src/app/services/menu.service';
import {InitCategoryHeaderToAdd, CategoryHeaderToAdd} from 'src/app/models/MenuToAdd';

@Component({
  selector: 'app-category-header-modify-modal',
  templateUrl: './category-header-modify-modal.component.html',
  styleUrls: ['./category-header-modify-modal.component.css']
})
export class CategoryHeaderModifyModalComponent implements OnInit {

  category: CategoryHeaderToAdd   //category header to add or modify
  @Input() localId: number
  @Input() categoryHeader: string
  @Input() orderNumber: number


  constructor(@Inject(MAT_DIALOG_DATA) public data: ProductAddModalComponent,
              private dialogRef: MatDialogRef<ProductAddModalComponent>,
              private menuService: MenuService,) {
    this.category = InitCategoryHeaderToAdd
    this.category.orderNumber = this.orderNumber
    this.category.categoryHeader = this.categoryHeader
  }


  ngOnInit(): void {

  }


  saveCategoryHeader() {
    console.log("ModifyCategoryHeader")
    this.category.categoryHeader = this.categoryHeader
    this.category.orderNumber = this.orderNumber
    this.menuService.updateCategoryHeader(this.localId, this.category)   // service to send to backend
    this.dialogRef.close()
  }

  onCloseClicked() {
    console.log(this.category)
    this.dialogRef.close()
  }

  trackByFn(index: any, item: any) {
    return index;
  }

}
