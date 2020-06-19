import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountPrivacyComponent } from '../account-privacy/account-privacy.component';
import {MatDialog} from '@angular/material/dialog';
import { CookiesPolicyComponent } from '../cookies-policy/cookies-policy.component';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor(
    private router: Router,
    public dialog: MatDialog,

  ) {}

  ngOnInit(): void {
  }

  openPrivacyDialog(){
    const dialogRef = this.dialog.open(AccountPrivacyComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openCookiesDialog(){
    const dialogRef = this.dialog.open(CookiesPolicyComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}
