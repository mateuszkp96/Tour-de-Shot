import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService, SocialUser } from "angularx-social-login";
import { GoogleLoginProvider } from "angularx-social-login";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  private user: SocialUser;
  private loggedIn: boolean;

  constructor(
    private router: Router,
    private authService: AuthService,
  ) {

  }

  signInWithGoogle(): void {
    console.log("loguje sie");
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(
      (res) => {
        console.log("U are logged in!");
        this.router.navigate(['signin']);
      });
      console.log('logged')
  }

  ngOnInit() {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      console.log(this.user);
      this.loggedIn = (user != null);
    });
  }

}
