import {Component, OnInit, Inject, Input} from '@angular/core';
import {MenuService} from 'src/app/services/menu.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Product} from 'src/app/models/Product';
import {InitialProduct} from 'src/app/models/InitialMenuItem';
import {ProductCategoryService} from 'src/app/services/product-category.service';
import {ProductCategory} from 'src/app/models/ProductCategory';

@Component({
  selector: 'app-product-add-modal',
  templateUrl: './product-add-modal.component.html',
  styleUrls: ['./product-add-modal.component.css']
})
export class ProductAddModalComponent implements OnInit {

  productToAdd: InitialProduct
  @Input() categoryHeader: string
  productCategories: ProductCategory[]

  constructor(@Inject(MAT_DIALOG_DATA) public data: ProductAddModalComponent,
              private dialogRef: MatDialogRef<ProductAddModalComponent>,
              private menuService: MenuService,
              private productCategoryService: ProductCategoryService) {
  }

  ngOnInit(): void {
    this.productToAdd = new InitialProduct()
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
    console.log("Saving product")
    console.log(this.productToAdd)
    this.dialogRef.close()
  }

  categoryChecked(event: string[]) {
    console.log("Category checked from local menu")
    let productsCategoryId = event.map(a=> (parseInt(a)))
    console.log(productsCategoryId)
  }
}
