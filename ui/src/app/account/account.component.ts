import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SocialUser, AuthService } from 'angularx-social-login';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

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
