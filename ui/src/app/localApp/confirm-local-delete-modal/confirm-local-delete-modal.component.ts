import {Component, OnInit, Inject} from '@angular/core';
import {WebLocalService} from 'src/app/services/web-local.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {LocalService} from 'src/app/services/local.service';
import {Local} from 'protractor/built/driverProviders';
import {Router} from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'angularx-social-login';

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
    private userService: UserService,
    private authService: AuthService
  ) {
  }

  ngOnInit(): void {
  }

  onConfirmClick() {
    this.userService.deactivation()
    this.dialogRef.close()
    this.userService.setLocalLoggedIn(false)
    this.authService.signOut().then(
      (res) => {
        this.router.navigate(['/startLocal']);
      }
    );



  }

}
