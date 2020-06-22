import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'
import { Router } from '@angular/router';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent implements OnInit {

  constructor(
    private router: Router,
    public dialogRef: MatDialogRef<ConfirmationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmationComponent) {

      dialogRef.disableClose = true;
    }

  ngOnInit(): void {
  }

  onYesClick(): void {
    this.dialogRef.close();
  }

  onNoClick(): void {
    window.location.href = "http://www.google.pl";
  }

}
