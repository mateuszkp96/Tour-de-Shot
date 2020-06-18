import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { AuthService, SocialUser } from "angularx-social-login";
import { environment } from "../../environments/environment"

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private router: Router,

  ) {}

  ngOnInit(): void {
  }

  onRegisterClick() {
    //How read values from environment, TODO - remove it
    console.log("LOCAL API URL: " + environment.localApiUrl)
    console.log("USER API URL: " + environment.userApiUrl)
    this.router.navigate(['register']);
  }

}
