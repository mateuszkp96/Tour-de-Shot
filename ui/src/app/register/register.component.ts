import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService, SocialUser } from "angularx-social-login";
import { GoogleLoginProvider } from "angularx-social-login";
import { UserService } from '../services/user.service';
import { Store } from '@ngrx/store';
import * as fromLocalLogin from '../state/localLogin.reducer';
import * as localLoginActions from '../state/localLogin.actions';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public user: SocialUser;
  public loggedIn: boolean;
  public displayUserView = this.userService.getUserView();

  constructor(
    private router: Router,
    private authService: AuthService,
    public userService: UserService,
    private store: Store<fromLocalLogin.AppState>,
  ) {

  }

  signInWithGoogle(): void {
    console.log("loguje sie");
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(
      (res) => {

        if(this.displayUserView === true) {
          console.log("U are logged in!");
          this.loggedIn = true;
          this.router.navigate(['/search']);
        } else {
          this.loggedIn = true;
          this.userService.setLocalLoggedIn(true)
          this.router.navigate(['locals']);
        }

      });
      console.log('logged')
    this.userService.registration()
  }

  ngOnInit() {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      console.log(this.user);
      this.loggedIn = (user != null);
    });
  }

}
