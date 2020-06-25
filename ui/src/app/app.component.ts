import {Component, OnInit} from '@angular/core';
import {AuthService, SocialUser} from 'angularx-social-login';
import {Router} from '@angular/router';
import { Store, select } from '@ngrx/store';
import * as fromLocalLogin from '../app/state/localLogin.reducer';
import * as localLoginActions from '../app/state/localLogin.actions';
import { HttpClient } from '@angular/common/http';
import decode from 'jwt-decode';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  template: `
              <app-sign-in-nav (toggleBtnClickedEmmiter)='onToggleBtnClicked($event)'></app-sign-in-nav>
              <app-local [localId]="localId"></app-local>
              <app-local-menu [localId]="localId"></app-local-menu>`

})
export class AppComponent implements OnInit {
  title = 'Tour de Shot';
  public user: SocialUser;
  public loggedIn = true;
  public userChecked = false;
  public displayUserView: boolean 
  public href: string = "";

  // hardcoded yet
  public localLoggedIn: boolean;
  public localId = 2;

  constructor(
    private authService: AuthService,
    private router: Router,
    private store: Store<fromLocalLogin.AppState>,
    public http: HttpClient,
    public userService: UserService
  ) {
  }

  ngOnInit(): void {

    //console.log("Button Zaloguj not active yet")

    this.authService.authState.subscribe((user) => {
      this.userChecked = true;
      this.user = user;
      this.loggedIn = (user != null);
      if (this.user) {
      //  this.router.navigate(['/search']);
      } else {
        //this.router.navigate(['']);
      }
      //console.log("logged in from app");
      //console.log(this.loggedIn);

      this.href = this.router.url;
      if (this.href === '/startLocal'){
        this.userService.setUserView(false);
        this.displayUserView = this.userService.getUserView();
      }
      this.displayUserView = this.userService.getUserView();

      //console.log(this.displayUserView)

    });



    this.store.pipe(select(fromLocalLogin.getLocalLoggedIn)).subscribe(
      async loggedIn => {
        if (loggedIn) {
          //console.log("From app loggedIn" + loggedIn)
          this.localLoggedIn = loggedIn;
        }
      });

    //this.localLoggedIn = this.userService.getLocalLoggedIn()

  }


  onToggleBtnClicked() {
    document.getElementById("side-menu-bar").classList.toggle("menuHidden");
    //console.log("open");
  }


}
