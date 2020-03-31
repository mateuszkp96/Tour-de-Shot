import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, SocialUser } from "angularx-social-login";

@Component({
  selector: 'logout-dropmenu',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  public user: SocialUser;
  public loggedIn: boolean; 

  constructor(
    private router: Router,
    private authService: AuthService) { }

  ngOnInit() {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      console.log(this.user);
      this.loggedIn = (user != null);
    });
  }

  signOut(): void {
    this.authService.signOut().then(
      (res) => {
        this.router.navigate(['']);
      }
    );
  }
}
