import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MenuService } from '../../services/menu.service';
import { WebLocalService } from '../../services/web-local.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MenuItem } from '../../models/MenuItem';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Product } from '../../models/Product';
import { LocalDetailed } from '../../models/LocalDetailed';

@Component({
  selector: 'app-local',
  templateUrl: './local.component.html',
  styleUrls: ['./local.component.css']
})
export class LocalComponent implements OnInit {

  @Input() localId: number
  local: LocalDetailed

  constructor(
    private router: Router,
    private webLocalService: WebLocalService,
    private menuService: MenuService,
    private modalService: NgbModal,
    public dialog: MatDialog,
    ) {

  }

  ngOnInit(): void {
    this.localId = 2; // hardcoded here yet
    this.getLocal(this.localId)


  }

  getLocal(id: number){
    this.webLocalService.getLocalById(id).then(local=>
    this.local = local)
  }




}
