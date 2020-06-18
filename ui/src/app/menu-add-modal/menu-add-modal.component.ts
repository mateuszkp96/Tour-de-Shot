import {Component, OnInit, Input, Inject, Output, EventEmitter, SimpleChange} from '@angular/core';
import {Local} from '../models/Local';
import {LocalService} from '../services/local.service';
import {WebLocalService} from '../services/web-local.service';
import {MAT_DIALOG_DATA} from '@angular/material/dialog'
import {Subject} from 'rxjs';
import {LocalDetailed} from '../models/LocalDetailed';
import {MenuItem} from '../models/MenuItem';
import {MenuService} from '../services/menu.service';
import construct = Reflect.construct;
import { InitialMenuItem } from '../models/InitialMenuItem';


@Component({
  selector: 'app-menu-add-modal',
  templateUrl: './menu-add-modal.component.html',
  styleUrls: ['./menu-add-modal.component.css']
})
export class MenuAddModalComponent implements OnInit {

  menuItemToAdd: InitialMenuItem

  constructor(@Inject(MAT_DIALOG_DATA) public data: MenuAddModalComponent,
              private menuService: MenuService) {
  }

  ngOnInit(): void {
    console.log(this.menuItemToAdd)
    this.menuItemToAdd = new InitialMenuItem()
  }

  saveMenuCategory() {
    console.log("Adding menu category not active yet")
  }

}
