import {Component, OnInit, Inject, Input} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ProductAddModalComponent} from '../product-add-modal/product-add-modal.component';
import {MenuService} from 'src/app/services/menu.service';
import {CategoryHeaderToAdd, InitCategoryHeaderToAdd} from 'src/app/models/MenuToAdd';
import {FormGroup, Validators, FormControl} from '@angular/forms';

@Component({
  selector: 'app-category-header-add-modal',
  templateUrl: './category-header-add-modal.component.html',
  styleUrls: ['./category-header-add-modal.component.css']
})
export class CategoryHeaderAddModalComponent implements OnInit {

  @Input() localId: number;
  category: CategoryHeaderToAdd   //category header to add or modify
  categoryHeaderAddForm: FormGroup;
  categoryHeaderInvalid: boolean
  orderNumberInvalid: boolean

  constructor(@Inject(MAT_DIALOG_DATA) public data: ProductAddModalComponent,
              private dialogRef: MatDialogRef<ProductAddModalComponent>,
              private menuService: MenuService,) {
  }


  ngOnInit(): void {
    this.category = InitCategoryHeaderToAdd
    this.categoryHeaderAddForm = new FormGroup({
      'categoryHeader': new FormControl(this.category.categoryHeader, Validators.required),
      'orderNumber': new FormControl(this.category.orderNumber, Validators.required)
    });
  }


  saveCategoryHeader() {
    if (this.category.categoryHeader == "")
      this.categoryHeaderInvalid = true
    else
      this.categoryHeaderInvalid = false
    if (this.category.orderNumber == null)
      this.orderNumberInvalid = true
    else
      this.orderNumberInvalid = false
    
    if(!this.orderNumberInvalid && !this.categoryHeaderInvalid){
      console.log("saveCategoryHeader")
      console.log(this.category)
      this.menuService.addCategoryHeader(this.localId, this.category)
      this.dialogRef.close()
    }

  }

  onCloseClicked() {
    this.dialogRef.close()
  }

  trackByFn(index: any, item: any) {
    return index;
  }

  onSubmit() {
// TODO: Use EventEmitter with form value
    console.warn(this.categoryHeaderAddForm.value);
  }

  get categoryHeader() {
    return this.categoryHeaderAddForm.get('categoryHeader');
  }

  get orderNumber() {
    return this.categoryHeaderAddForm.get('orderNumber');
  }


}
