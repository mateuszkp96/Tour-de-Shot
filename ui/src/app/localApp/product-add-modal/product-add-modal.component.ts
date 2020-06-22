import {Component, OnInit, Inject, Input} from '@angular/core';
import {MenuService} from 'src/app/services/menu.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Product} from 'src/app/models/Product';
import {ProductCategoryService} from 'src/app/services/product-category.service';
import {ProductCategory} from 'src/app/models/ProductCategory';
import {ProductService} from 'src/app/services/product.service';
import {ProductToAdd, InitProductToAdd} from 'src/app/models/ProductToAdd';

@Component({
  selector: 'app-product-add-modal',
  templateUrl: './product-add-modal.component.html',
  styleUrls: ['./product-add-modal.component.css']
})
export class ProductAddModalComponent implements OnInit {

  productToAdd: ProductToAdd
  @Input() categoryHeader: string
  @Input() orderNumber: number
  productCategories: ProductCategory[]
  productsCategoryId: string[]
  localId: number

  constructor(@Inject(MAT_DIALOG_DATA) public data: ProductAddModalComponent,
              private dialogRef: MatDialogRef<ProductAddModalComponent>,
              private menuService: MenuService,
              private productCategoryService: ProductCategoryService,
              private productService: ProductService) {
  }

  ngOnInit(): void {
    this.productToAdd = InitProductToAdd
    this.getProductCategories()
    this.localId = 2
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
    this.productToAdd.categoryId = this.productsCategoryId[0]
    console.log(this.productToAdd)
    this.productService.addProduct(this.localId, this.orderNumber, this.productToAdd)
    this.dialogRef.close()
  }

  categoryChecked(event: string[]) {
    console.log("Category checked from local menu")
    this.productsCategoryId = event
    console.log(this.productsCategoryId)
  }

  trackByFn(index: any, item: any) {
    return index;
  }
}
