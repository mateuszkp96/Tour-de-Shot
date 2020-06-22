import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-modal.component.html',
})
export class DeleteAccountComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: DeleteAccountComponent,
  public dialogRef: MatDialogRef<DeleteAccountComponent>){


  }

  ngOnInit(): void {
  }

  onConfirmClick(): void {
    this.dialogRef.close();
  }

  onYesClick(): void {
    this.dialogRef.close();
  }

}
