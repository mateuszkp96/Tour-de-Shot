import {Component, OnInit} from '@angular/core';
import {SocialUser, AuthService} from 'angularx-social-login';
import {Router} from '@angular/router';
import {UserHistoryService} from 'src/app/services/user-history.service';
import {UserHistory} from 'src/app/models/UserHistory';

@Component({
  selector: 'app-account-history',
  templateUrl: './account-history.component.html',
  styleUrls: ['./account-history.component.css']
})
export class AccountHistoryComponent implements OnInit {

  public user: SocialUser;
  public loggedIn: boolean;
  public history: UserHistory;

  constructor(private router: Router,
              private authService: AuthService,
              private userHistoryService: UserHistoryService
  ) {
  }

  ngOnInit(): void {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      console.log(this.user);
      this.loggedIn = (user != null);
    });

    this.userHistoryService.getUserHistory().then(history => {
      this.history = history['content'] as UserHistory
      console.log(this.history)
    });

  }

}
