import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, SocialUser } from 'angularx-social-login';
import { MatDialog } from '@angular/material/dialog';
import { DeleteAccountComponent } from './delete-modal.component'

@Component({
  selector: 'app-account-general',
  templateUrl: './account-general.component.html',
  styleUrls: ['./account-general.component.css']
})
export class AccountGeneralComponent implements OnInit {

  public user: SocialUser;
  public loggedIn: boolean;

  constructor(
    private router: Router,
    private authService: AuthService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      //console.log(this.user);
      this.loggedIn = (user != null);
    });
  }

  onGoogleSettingsClicked(){
    window.open("https://myaccount.google.com", "_blank");
  }

  deleteAccountModal(){
    const dialogRef = this.dialog.open(DeleteAccountComponent);

    dialogRef.afterClosed().subscribe(result => {
     // console.log(`Dialog result: ${result}`);
    });
  }

}
