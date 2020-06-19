import {Component, OnInit, Input, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ProductAddModalComponent} from '../product-add-modal/product-add-modal.component';
import {MenuService} from 'src/app/services/menu.service';
import {Product} from 'src/app/models/Product';

@Component({
  selector: 'app-product-modify-modal',
  templateUrl: './product-modify-modal.component.html',
  styleUrls: ['./product-modify-modal.component.css']
})
export class ProductModifyModalComponent implements OnInit {

  productToModify: Product

  productToModifyName: string

  constructor(@Inject(MAT_DIALOG_DATA) public data: ProductAddModalComponent,
              private dialogRef: MatDialogRef<ProductAddModalComponent>,
              private menuService: MenuService,) {
  }

  ngOnInit(): void {
    console.log("Product to modify")
    console.log(this.productToModify)
    this.productToModifyName = this.productToModify.name
    console.log(this.productToModifyName)

  }


  onAddIngredientClick() {
    console.log("add ingredient")
    this.productToModify.ingredients.push("")
    console.log(this.productToModify.ingredients)
  }

  onDeleteIngredientClick(id: number) {
    console.log("delete ingredient")
    if (this.productToModify.ingredients.length > 1) {
      this.productToModify.ingredients.splice(id, 1);
    }
    console.log(this.productToModify.ingredients)
  }

  saveProduct() {
    console.log("Saving product")
    console.log(this.productToModify)
    // service to send to backend
    this.dialogRef.close()
  }

  onCloseClicked() {
    console.log(this.productToModify)
    this.dialogRef.close()
  }

  trackByFn(index: any, item: any) {
    return index;
  }

}
