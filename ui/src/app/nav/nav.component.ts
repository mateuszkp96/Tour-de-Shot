import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, SocialUser } from "angularx-social-login";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  appTitle = 'Tour de Shot';

  private user: SocialUser;
  private loggedIn: boolean; 

  constructor(
    private router: Router,
    private authService: AuthService,
  ) { }

  signOut(): void {
    this.authService.signOut().then(
      (res) => {
        this.router.navigate(['']);
      }
    );
  }

  ngOnInit() {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      console.log(this.user);
      this.loggedIn = (user != null);
    });
  }

}