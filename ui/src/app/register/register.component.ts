import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService, SocialUser } from "angularx-social-login";
import { GoogleLoginProvider } from "angularx-social-login";
import { WebLoginService } from '../services/web-login.service'
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public user: SocialUser;
  public loggedIn: boolean;

  constructor(
    private router: Router,
    private authService: AuthService,
    private webLoginService: WebLoginService,
    private userService: UserService
  ) {

  }

  signInWithGoogle(): void {
    console.log("loguje sie");
    this.webLoginService.getUserJson().then(
      (res) => {
        console.log("U are logged in!");
        this.loggedIn = true;
        this.router.navigate(['/search']);
        console.log(this.userService.geUserList())
      });
    console.log('logged')
  }

  // this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(
  //   (res) => {
  //     console.log("U are logged in!");
  //     this.loggedIn = true;
  //     this.router.navigate(['/search']);
  //   });
  //   console.log('logged')


  ngOnInit() {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      console.log(this.user);
      this.loggedIn = (user != null);
    });
  }

}
