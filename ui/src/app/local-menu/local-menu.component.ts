import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import { MenuAddModalComponent } from '../menu-add-modal/menu-add-modal.component';
import { InitialMenuItem } from '../models/InitialMenuItem';
import { WebLocalService } from '../services/web-local.service';
import { MenuService } from '../services/menu.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MatDialog } from '@angular/material/dialog';
import { Product } from '../models/Product';
import { LocalDetailed } from '../models/LocalDetailed';

@Component({
  selector: 'app-local-menu',
  templateUrl: './local-menu.component.html',
  styleUrls: ['./local-menu.component.css']
})
export class LocalMenuComponent implements OnInit {

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
    this.getLocal(2)    //todo: changing to appropriate local
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
    //console.log(this.local)
    dialogRef.componentInstance.menuItemToAdd = this.menuItemToAdd;

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  removeMenuItemProduct(product: Product){
    console.log("Product remove")
  }

  modifyMenuItemProduct(product: Product, i: number, j: number){
    console.log("Product modify")

  }

}
