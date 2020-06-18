import { Component, OnInit, Input, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProductAddModalComponent } from '../product-add-modal/product-add-modal.component';
import { MenuService } from 'src/app/services/menu.service';
import { Product } from 'src/app/models/Product';

@Component({
  selector: 'app-product-modify-modal',
  templateUrl: './product-modify-modal.component.html',
  styleUrls: ['./product-modify-modal.component.css']
})
export class ProductModifyModalComponent implements OnInit {

  @Input() productToModify: Product

  constructor(@Inject(MAT_DIALOG_DATA) public data: ProductAddModalComponent,
              private dialogRef: MatDialogRef<ProductAddModalComponent>,
              private menuService: MenuService,) {
  }

  ngOnInit(): void {
    console.log("Product to modify")
    console.log(this.productToModify)
    console.log(this.productToModify.ingredients[0])

  }


  onAddIngredientClick() {
  //  this.productToAdd.ingredients.push(new InitialIngredient())
    console.log("add ingredient")
  }

  onDeleteIngredientClick(id: number) {
  //  this.productToAdd.ingredients.splice(id, 1);
    console.log("delete ingredient")
  }

  saveProduct() {
    console.log("Saving product")
    console.log(this.productToModify)
    // put to backend
    this.dialogRef.close()
  }
}
