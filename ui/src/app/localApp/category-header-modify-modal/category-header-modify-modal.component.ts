import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProductAddModalComponent } from '../product-add-modal/product-add-modal.component';
import { MenuService } from 'src/app/services/menu.service';
import { CategoryHeaderToAdd, InitCategoryHeaderToAdd } from 'src/app/models/MenuHeaderToAdd';

@Component({
  selector: 'app-category-header-modify-modal',
  templateUrl: './category-header-modify-modal.component.html',
  styleUrls: ['./category-header-modify-modal.component.css']
})
export class CategoryHeaderModifyModalComponent implements OnInit {

  categoryHeader: CategoryHeaderToAdd   //category header to add or modify


  constructor(@Inject(MAT_DIALOG_DATA) public data: ProductAddModalComponent,
              private dialogRef: MatDialogRef<ProductAddModalComponent>,
              private menuService: MenuService,) {
  }


  ngOnInit(): void {
    this.categoryHeader = InitCategoryHeaderToAdd
  }


  saveCategoryHeader() {
    console.log("saveCategoryHeader")
   // console.log(this.productToModify)
    // service to send to backend
    this.dialogRef.close()
  }

  onCloseClicked() {
    console.log(this.categoryHeader)
    this.dialogRef.close()
  }

  trackByFn(index: any, item: any) {
    return index;
  }

}
