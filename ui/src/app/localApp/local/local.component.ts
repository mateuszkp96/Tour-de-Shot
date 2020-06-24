import {Component, OnInit, Input, ViewEncapsulation} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {MenuService} from '../../services/menu.service';
import {WebLocalService} from '../../services/web-local.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {MenuItem} from '../../models/MenuItem';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {Product} from '../../models/Product';
import {LocalDetailed} from '../../models/LocalDetailed';

@Component({
  selector: 'app-local',
  templateUrl: './local.component.html',
  styleUrls: ['./local.component.css']
})
export class LocalComponent implements OnInit {

  local: LocalDetailed
  localId = 1
  public backgroundColorToggle = "#227fee"

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private webLocalService: WebLocalService,
    private menuService: MenuService,
    private modalService: NgbModal,
    public dialog: MatDialog,
  ) {

  }

  ngOnInit(): void {

    this.localId = Number(this.route.snapshot.params.id);
    this.getLocal(this.localId)

  }

  getLocal(id: number) {
    this.webLocalService.getLocalById(id).then(local =>
      this.local = local)
  }

  onBackClick() {
    this.router.navigate(['locals']);
  }

  localDeleted(event: string[]) {
    console.log("Local deleted")
    //this.localService.updateCheckedCategories(event)
  }
}
