import { Component, OnInit } from '@angular/core';
import { AuthService, SocialUser } from 'angularx-social-login';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  template: `<app-sign-in-nav (toggleBtnClickedEmmiter)='onToggleBtnClicked($event)'></app-sign-in-nav>`
})
export class AppComponent implements OnInit{
  title = 'Tour de Shot';
  public user: SocialUser;
  public loggedIn = true;
  public userChecked = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

ngOnInit(): void {
  this.authService.authState.subscribe((user) => {
    this.userChecked = true;
    this.user = user;
    this.loggedIn = (user != null);
    if(this.user) {
      this.router.navigate(['/search']);
    }else
    {
      this.router.navigate(['']);
    }
    console.log("logged in from app");
    console.log(this.loggedIn);
  });
}

  onToggleBtnClicked() {
    document.getElementById("wrapper").classList.toggle("menuHidden");
    console.log("open");
  }
}
