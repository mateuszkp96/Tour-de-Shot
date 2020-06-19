import {Component, OnInit, Inject} from '@angular/core';
import {WebLocalService} from 'src/app/services/web-local.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {LocalService} from 'src/app/services/local.service';
import {Local} from 'protractor/built/driverProviders';
import {Router} from '@angular/router';

@Component({
  selector: 'app-confirm-local-delete-modal',
  templateUrl: './confirm-local-delete-modal.component.html',
  styleUrls: ['./confirm-local-delete-modal.component.css']
})
export class ConfirmLocalDeleteModalComponent implements OnInit {

  locals: Local[]
  localId: number

  constructor(
    private router: Router,
    private webLocalService: WebLocalService,
    private localService: LocalService,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmLocalDeleteModalComponent,
    private dialogRef: MatDialogRef<ConfirmLocalDeleteModalComponent>,
  ) {
  }

  ngOnInit(): void {
    this.localId = 4;
  }


  onConfirmClick() {
    console.log("For testing deleted was local 4, it works")
    this.deleteLocal(this.localId)
  }

  deleteLocal(id: number) {
    this.webLocalService.deleteLocalById(id).then(() => {
      this.dialogRef.close()
      this.router.navigate(['']);
    });
  }

}
