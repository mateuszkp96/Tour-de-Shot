import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SignInComponent } from '../sign-in/sign-in.component';
import { LocalService } from '../services/local.service';
import { WebLocalService } from '../services/web-local.service';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {


  constructor(
    private router: Router,
    private localService: LocalService
  ) {}


  ngOnInit(): void {
    this.test();
  }


  test(){
    this.localService.createLocal('newLocal').subscribe((response:any)=>{
      console.log(response);
    });
  }
}
