import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { AuthService, SocialUser } from "angularx-social-login";
import { environment } from "../../environments/environment"
import * as fromLocalLogin from '../state/localLogin.reducer'
import * as localLoginActions from '../state/localLogin.actions'
import { Store } from '@ngrx/store';
import { LocalLoginService } from '../services/local-login.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private router: Router,
    private store: Store<fromLocalLogin.AppState>,
    private localLoginService: LocalLoginService
  ) {}

  ngOnInit(): void {
  }

  onRegisterClick() {
    //How read values from environment, TODO - remove it
    console.log("LOCAL API URL: " + environment.localApiUrl)
    console.log("USER API URL: " + environment.userApiUrl)
    this.router.navigate(['register']);
  }

  onLoginAsLocalClick(){
    this.store.dispatch(new localLoginActions.SelectLocalLoggedIn(true))
    this.store.dispatch(new localLoginActions.SelectLocalId(2))
    this.localLoginService.updateStartPoint(2)
    this.router.navigate(['menu']);

  }



}
