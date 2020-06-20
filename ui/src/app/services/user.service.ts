import {Injectable} from '@angular/core';
import {HttpClientModule, HttpClient} from '@angular/common/http';
import {WebLoginService} from './web-login.service';
import {Local} from '../models/Local';
import {Subject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  usersList: any = []

  constructor(private webLoginService: WebLoginService) {

  }

  async geUserList() {
    await this.webLoginService.getUserJson().then(data => {
      this.usersList = data["content"]
    });

    return this.usersList

  }
}
