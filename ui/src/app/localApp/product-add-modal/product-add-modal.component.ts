import {Component, OnInit, Inject, Input} from '@angular/core';
import {MenuService} from 'src/app/services/menu.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Product} from 'src/app/models/Product';
import {ProductCategoryService} from 'src/app/services/product-category.service';
import {ProductCategory} from 'src/app/models/ProductCategory';
import {ProductService} from 'src/app/services/product.service';
import {ProductToAdd, InitProductToAdd} from 'src/app/models/ProductToAdd';
import {FormGroup, FormControl, Validators} from '@angular/forms';

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
  @Input() localId: number
  productAddForm: FormGroup;
  categoryInvalid: boolean = false
  nameInvalid: boolean = false
  priceInvalid: boolean = false
  ingredientsInvalid: boolean = false
  descriptionInvalid: boolean = false
  buttonSaveClicked: boolean = false

  constructor(@Inject(MAT_DIALOG_DATA) public data: ProductAddModalComponent,
              private dialogRef: MatDialogRef<ProductAddModalComponent>,
              private menuService: MenuService,
              private productCategoryService: ProductCategoryService,
              private productService: ProductService) {
  }

  ngOnInit(): void {
    this.productToAdd = InitProductToAdd
    this.getProductCategories()

    this.productAddForm = new FormGroup({
      'category': new FormControl(this.productToAdd.categoryId, Validators.required),
      'name': new FormControl(this.productToAdd.name, Validators.required),
      'ingredients': new FormControl(this.productToAdd.ingredients, Validators.required),
      'price': new FormControl(this.productToAdd.price, Validators.required),
      'description': new FormControl(this.productToAdd.description, Validators.required),

    });


  }

  getProductCategories() {
    this.productCategoryService.getProductCategory().subscribe(data =>
      this.productCategories = data)
  }

  onAddIngredientClick() {
    this.productToAdd.ingredients.push("")
    //console.log(this.productToAdd.ingredients)
  }

  onDeleteIngredientClick(id: number) {
    this.productToAdd.ingredients.splice(id, 1);
    //console.log(this.productToAdd.ingredients)
  }

  categoryChecked(event: string[]) {
    //console.log("Category checked from local menu")
    this.productsCategoryId = event
   // console.log(this.productsCategoryId)
    this.productToAdd.categoryId = parseInt(this.productsCategoryId[0])
    this.productAddForm.get('ingredients')
  }

  saveProduct() {
   // console.log("this.productToAdd.ingredients[0]")
   //console.log(this.productToAdd.ingredients[0].length)
    this.buttonSaveClicked = true

    if (this.productToAdd.categoryId == null)
      this.categoryInvalid = true
    else {
      this.categoryInvalid = false
      this.productToAdd.categoryId = parseInt(this.productsCategoryId[0])
    }
    if (this.productToAdd.name == "")
      this.nameInvalid = true
    else
      this.nameInvalid = false
    if (this.productToAdd.ingredients == [""])
      this.ingredientsInvalid = true
    else
      this.ingredientsInvalid = false
    if (this.productToAdd.description == "")
      this.descriptionInvalid = true
    else
      this.descriptionInvalid = false
    if (this.productToAdd.price == null)
      this.priceInvalid = true
    else
      this.priceInvalid = false

    if (!this.descriptionInvalid && !this.ingredientsInvalid && !this.nameInvalid && !this.categoryInvalid&& !this.priceInvalid){
      //console.log(this.productToAdd.ingredients)
      this.productService.addProduct(this.localId, this.orderNumber, this.productToAdd)
      this.dialogRef.close()
    }

      }

  trackByFn(index: any, item: any) {
    return index;
  }

  get category() {
    return this.productAddForm.get('category');
  }

  get name() {
    return this.productAddForm.get('name');
  }

  get ingredients() {
    return this.productAddForm.get('ingredients');
  }

  get description() {
    return this.productAddForm.get('description');
  }

  get price() {
    return this.productAddForm.get('price');
  }


}
