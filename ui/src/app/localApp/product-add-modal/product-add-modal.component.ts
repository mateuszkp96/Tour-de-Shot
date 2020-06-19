import {Component, OnInit, Inject, Input} from '@angular/core';
import {MenuService} from 'src/app/services/menu.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Product} from 'src/app/models/Product';
import {ProductCategoryService} from 'src/app/services/product-category.service';
import {ProductCategory} from 'src/app/models/ProductCategory';
import {initialProduct} from 'src/app/models/InitialMenuItem';

@Component({
  selector: 'app-product-add-modal',
  templateUrl: './product-add-modal.component.html',
  styleUrls: ['./product-add-modal.component.css']
})
export class ProductAddModalComponent implements OnInit {

  productToAdd: Product
  @Input() categoryHeader: string
  productCategories: ProductCategory[]
  productsCategoryId: number[]

  constructor(@Inject(MAT_DIALOG_DATA) public data: ProductAddModalComponent,
              private dialogRef: MatDialogRef<ProductAddModalComponent>,
              private menuService: MenuService,
              private productCategoryService: ProductCategoryService) {
  }

  ngOnInit(): void {
    this.productToAdd = initialProduct
    this.getProductCategories()
  }

  getProductCategories() {
    this.productCategoryService.getProductCategory().subscribe(data =>
      this.productCategories = data)
  }

  onAddIngredientClick() {
    this.productToAdd.ingredients.push("")
    console.log(this.productToAdd.ingredients)
  }

  onDeleteIngredientClick(id: number) {
    this.productToAdd.ingredients.splice(id, 1);
    console.log(this.productToAdd.ingredients)
  }

  saveProduct() {
    console.log("Product to add")
    this.productToAdd.productCategory = this.productsCategoryId[0]
    console.log(this.productToAdd)
    this.dialogRef.close()
  }

  categoryChecked(event: string[]) {
    console.log("Category checked from local menu")
    this.productsCategoryId = event.map(a => (parseInt(a)))
    console.log(this.productsCategoryId)
  }

  trackByFn(index: any, item: any) {
    return index;
  }
}
