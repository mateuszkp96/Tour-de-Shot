import {Component, OnInit, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog'
import {UserService} from 'src/app/services/user.service';
import {AuthService} from 'angularx-social-login';
import {Router} from '@angular/router';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-modal.component.html',
})
export class DeleteAccountComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: DeleteAccountComponent,
              public dialogRef: MatDialogRef<DeleteAccountComponent>,
              private userService: UserService,
              private authService: AuthService,
              private router: Router) {


  }

  ngOnInit(): void {
  }

  onConfirmClick(): void {
    this.userService.deactivation()
    this.dialogRef.close();
    this.authService.signOut().then(
      (res) => {
        this.router.navigate(['']);
      }
    );
  }

  onYesClick(): void {
    this.dialogRef.close();
  }

}
