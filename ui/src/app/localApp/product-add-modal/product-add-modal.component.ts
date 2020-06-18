import {Component, OnInit, Inject, Input} from '@angular/core';
import {MenuService} from 'src/app/services/menu.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Product} from 'src/app/models/Product';
import {InitialProduct} from 'src/app/models/InitialMenuItem';

@Component({
  selector: 'app-product-add-modal',
  templateUrl: './product-add-modal.component.html',
  styleUrls: ['./product-add-modal.component.css']
})
export class ProductAddModalComponent implements OnInit {

  productToAdd: InitialProduct
  @Input() categoryHeader: string

  constructor(@Inject(MAT_DIALOG_DATA) public data: ProductAddModalComponent,
              private dialogRef: MatDialogRef<ProductAddModalComponent>,
              private menuService: MenuService,) {
  }

  ngOnInit(): void {
    this.productToAdd = new InitialProduct()
    this.productToAdd.productCategory.name = this.categoryHeader
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
}
