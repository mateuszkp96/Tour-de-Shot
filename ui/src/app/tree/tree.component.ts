import { Component } from '@angular/core';
import { enableRipple } from '@syncfusion/ej2-base';
enableRipple(true);

@Component({
  selector: 'app-tree',
  // specifies the template string for the TreeView component with CheckBox
  template: `<div id='treeparent'><ejs-treeview id='treeelement' [fields]='field' [showCheckBox]='showCheckBox'></ejs-treeview></div>`
})
export class TreeComponent {

  constructor() {
  }
  // defined the array of data
  public countries: object[] = [
    { id: 1, name: 'Napoje alkoholowe', hasChild: true, expanded: true },
    { id: 2, pid: 1, name: 'piwo' },
    { id: 3, pid: 1, name: 'wódka' },
    { id: 4, pid: 1, name: 'whisky' },
    { id: 6, pid: 1, name: 'drinki' },
    { id: 7, name: 'Napoje bezalkoholowe', hasChild: true },
    { id: 8, pid: 7, name: 'sok pomarańczowy' },
    { id: 9, pid: 7, name: 'sok jabłkowy' },
    { id: 10, pid: 7, name: 'smoothie owocowe' },
  ];
  // maps the appropriate column to fields property
  public field: object = { dataSource: this.countries, id: 'id', parentID: 'pid', text: 'name', hasChildren: 'hasChild' };
  // set the CheckBox to the TreeView
  public showCheckBox = true;
}
