import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuService } from '../services/menu.service';
import { WebLocalService } from '../services/web-local.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MenuItem } from '../models/MenuItem';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MenuAddModalComponent } from '../menu-add-modal/menu-add-modal.component';
import { Product } from '../models/Product';
import { InitialMenuItem } from '../models/InitialMenuItem';
import { LocalDetailed } from '../models/LocalDetailed';

@Component({
  selector: 'app-local',
  templateUrl: './local.component.html',
  styleUrls: ['./local.component.css']
})
export class LocalComponent implements OnInit {

  local: LocalDetailed
  menuItemToAdd: InitialMenuItem

  constructor(
    private router: Router,
    private webLocalService: WebLocalService,
    private menuService: MenuService,
    private modalService: NgbModal,
    public dialog: MatDialog,
    ) {

  }

  ngOnInit(): void {
    this.getLocal(1)    //todo: changing to appropriate local
    this.menuItemToAdd = new InitialMenuItem()


  }

  getLocal(id: number){
    this.webLocalService.getLocalById(id).then(local=>
    this.local = local)
  }

  //onAddReportClick(modal) {
  //  this.modalService.open(modal, {ariaLabelledBy: 'modal-basic-title'});
  //}

  onAddMenuItemClick() {
      const dialogRef = this.dialog.open(MenuAddModalComponent);
      console.log(this.local)
      dialogRef.componentInstance.menuItemToAdd = this.menuItemToAdd;

      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
      });

  }

}
