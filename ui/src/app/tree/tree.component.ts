import {Component, OnInit, ViewChild, Output, EventEmitter} from '@angular/core';
import {enableRipple} from '@syncfusion/ej2-base';
import {ProductCategoryService} from '../services/product-category.service';
import {ProductCategory} from '../models/ProductCategory';
import {TreeViewComponent, NodeKeyPressEventArgs, NodeClickEventArgs} from '@syncfusion/ej2-angular-navigations';

enableRipple(true);

@Component({
  selector: 'app-tree',
  // specifies the template string for the TreeView component with CheckBox
  template: `<div id='treeparent'><ejs-treeview #treeview="" id='treeelement' [fields]='field' [showCheckBox]='showCheckBox'  (nodeChecked)='nodeChecked($event)'></ejs-treeview></div>`
})
export class TreeComponent implements OnInit {
  public productCategoryList: object[];
  @Output() onCategoryChecked: EventEmitter<any> = new EventEmitter<any>();
  checkedNodesName: string[] = []

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

      //console.log("productCategoryList")
      //console.log(this.productCategoryList)
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


  async nodeChecked(args) {
    /*
       this.tree.checkedNodes.forEach(node => {
          this.productCategoryService.getProdyctCategoryById(parseInt(node)).then(nodeInfo =>{
           // console.log(nodeInfo.name)
            this.checkedNodesName.push(nodeInfo.name)
           // console.log(this.checkedNodesName)
          });
            //this.checkedNodesName.push(nodeName.name));
        });
    */
    await this.getNodesName(this.tree.checkedNodes)

  }

  getNodesName(nodesId: string[]) {
    let counter = 0;
    this.checkedNodesName = []
    if (nodesId.length == 0) {
      this.checkedNodesName = []
      this.onCategoryChecked.emit(this.checkedNodesName)
    } else {
      nodesId.forEach(node => {
        this.productCategoryService.getProdyctCategoryById(parseInt(node)).subscribe(nodeInfo => {
          if (nodeInfo.hasChild == false) {
            this.checkedNodesName.push(nodeInfo.name)
            counter++
          } else {
            counter++
          }
          //this way beacuse cant cope with  async problem
          if (counter == nodesId.length) {
            this.onCategoryChecked.emit(this.checkedNodesName)
          }
        });
      });
    }
  }

}
