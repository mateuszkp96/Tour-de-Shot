import {Component, OnInit} from '@angular/core';
import {enableRipple} from '@syncfusion/ej2-base';
import {ProductCategoryService} from '../services/product-category.service';
import {ProductCategory} from '../models/ProductCategory';

enableRipple(true);

@Component({
  selector: 'app-tree',
  // specifies the template string for the TreeView component with CheckBox
  template: `<div id='treeparent'><ejs-treeview id='treeelement' [fields]='field' [showCheckBox]='showCheckBox'></ejs-treeview></div>`
})
export class TreeComponent implements OnInit {
  public productCategoryList: object[];

  constructor(private productCategoryService: ProductCategoryService) {
  }

  public categories: object[];
  public field: object;
  public showCheckBox = true;

  ngOnInit(): void {

    this.productCategoryService.getProductCategory().subscribe(data => {
      this.productCategoryList = data as object[]
      this.categories = this.productCategoryList;

      console.log("productCategoryList")
      console.log(this.productCategoryList)
      // maps the appropriate column to fields property
      let field: object = {
        dataSource: this.productCategoryList,
        id: 'id',
        parentID: 'pid',
        text: 'name',
        hasChildren: 'hasChild'
      };

      this.field = {dataSource: this.categories, id: 'id', parentID: 'parentId', text: 'name', hasChildren: 'hasChild'};
      this.showCheckBox = true;
    });

  }


}
