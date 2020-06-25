import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, SocialUser } from 'angularx-social-login';

@Component({
  selector: 'app-account-privacy2',
  templateUrl: './account-privacy2.component.html',
})
export class AccountPrivacyComponent2 implements OnInit {

  public user: SocialUser;
  public loggedIn: boolean;

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      //console.log(this.user);
      this.loggedIn = (user != null);
    });
  }
}
