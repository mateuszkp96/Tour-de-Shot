import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, SocialUser } from "angularx-social-login";
import { environment } from "../../environments/environment"
import { UserService } from '../services/user.service';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  appTitle = 'Tour de Shot';
  public user: SocialUser;
  public loggedIn: boolean;
  public displayUserView = this.userService.getUserView();
  public href: string = "";

  @Output()
  toggleBtnClickedEmmiter = new EventEmitter();

  constructor(
    private router: Router,
    private authService: AuthService,
    public userService: UserService
  ) { }

  ngOnInit() {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
    });
    /* this.href = this.router.url;
    if (this.href === '/startLocal'){
      this.userService.setUserView(false);
      this.displayUserView = this.userService.getUserView();
    }
    this.displayUserView = this.userService.getUserView(); */
  }

  toggleBtnClicked() {
    this.toggleBtnClickedEmmiter.emit();
  }

  onRegisterClick() {
    //How read values from environment, TODO - remove it
    console.log("LOCAL API URL: " + environment.localApiUrl)
    console.log("USER API URL: " + environment.userApiUrl)
    this.router.navigate(['register']);
  }


}
