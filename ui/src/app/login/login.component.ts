import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { google } from "google-maps";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  constructor(
              private router: Router,
  ) {}

  ngOnInit(): void {
  }

}
