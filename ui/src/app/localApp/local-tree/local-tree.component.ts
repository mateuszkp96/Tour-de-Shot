import {Component, OnInit, ViewChild, Output, EventEmitter} from '@angular/core';
import {enableRipple} from '@syncfusion/ej2-base';
import {TreeViewComponent, NodeKeyPressEventArgs, NodeClickEventArgs} from '@syncfusion/ej2-angular-navigations';
import {ProductCategoryService} from 'src/app/services/product-category.service';

enableRipple(true);

@Component({
  selector: 'app-local-tree',
  // specifies the template string for the TreeView component with CheckBox
  template: `<div id='treeparent'><ejs-treeview #treeview="" id='treeelement' [fields]='field' [showCheckBox]='showCheckBox'  (nodeClicked)='nodeCheck($event)'></ejs-treeview></div>`
})
export class LocalTreeComponent implements OnInit {
  public productCategoryList: object[];
  @Output() onCategoryChecked: EventEmitter<any> = new EventEmitter<any>();

  constructor(private productCategoryService: ProductCategoryService) {
  }

  @ViewChild('treeview')
  public tree: TreeViewComponent;

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

      this.field = {dataSource: this.categories, id: 'id', parentID: 'parentId', text: 'name', hasChildren: 'hasChild'};
      this.showCheckBox = true;

    });


  }


  public nodeCheck(args: NodeKeyPressEventArgs | NodeClickEventArgs): void {
    let checkedNode = this.tree.getAllCheckedNodes()
    let toUncheck = this.tree.checkedNodes.filter(a => a != this.tree.checkedNodes[this.tree.checkedNodes.length - 1])
    this.tree.uncheckAll(toUncheck);
    this.onCategoryChecked.emit(this.tree.checkedNodes)
  }

}
