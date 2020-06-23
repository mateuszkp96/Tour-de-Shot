import { Component, OnInit, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProductAddModalComponent } from '../product-add-modal/product-add-modal.component';
import { MenuService } from 'src/app/services/menu.service';
import { CategoryHeaderToAdd, InitCategoryHeaderToAdd } from 'src/app/models/MenuToAdd';

@Component({
  selector: 'app-category-header-add-modal',
  templateUrl: './category-header-add-modal.component.html',
  styleUrls: ['./category-header-add-modal.component.css']
})
export class CategoryHeaderAddModalComponent implements OnInit {

  @Input() localId: number;
  category: CategoryHeaderToAdd   //category header to add or modify


  constructor(@Inject(MAT_DIALOG_DATA) public data: ProductAddModalComponent,
              private dialogRef: MatDialogRef<ProductAddModalComponent>,
              private menuService: MenuService,) {
  }


  ngOnInit(): void {
    this.category = InitCategoryHeaderToAdd
  }


  saveCategoryHeader() {
    console.log("saveCategoryHeader")
    console.log(this.category)
    this.menuService.addCategoryHeader(this.localId, this.category)
    this.dialogRef.close()
  }

  onCloseClicked() {
    this.dialogRef.close()
  }

  trackByFn(index: any, item: any) {
    return index;
  }

}
