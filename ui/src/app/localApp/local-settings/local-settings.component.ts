import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmLocalDeleteModalComponent } from '../confirm-local-delete-modal/confirm-local-delete-modal.component';

@Component({
  selector: 'app-local-settings',
  templateUrl: './local-settings.component.html',
  styleUrls: ['./local-settings.component.css']
})
export class LocalSettingsComponent implements OnInit {

  constructor(
    private router: Router,
    private modalService: NgbModal,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
  }

  onDeleteAccountClick(){
    const dialogRef = this.dialog.open(ConfirmLocalDeleteModalComponent);

    dialogRef.afterClosed().subscribe(result => {
      //console.log("Dialog close");
    });
  }
}
