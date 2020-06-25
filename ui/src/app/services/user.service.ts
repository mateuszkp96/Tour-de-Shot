import {Injectable} from '@angular/core';
import {HttpClientModule, HttpClient} from '@angular/common/http';
import {WebLoginService} from './web-login.service';
import {Local} from '../models/Local';
import {Subject, Observable} from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  usersList: any = []
  public displayUserView = true;
  readonly LOCAL_API_URL;

  constructor(private webLoginService: WebLoginService,
              private http: HttpClient) {
    this.LOCAL_API_URL = environment.userApiUrl
  }

  async geUserList() {
    await this.webLoginService.getUserJson().then(data => {
      this.usersList = data["content"]
    });

    return this.usersList

  }

  getYourLocalsList(): Promise<any> {
    return this.http.get(this.LOCAL_API_URL + '/user-local').toPromise()

  }

  setUserView (option) {
    return this.displayUserView = option;
  }

  getUserView () {
    return this.displayUserView;
  }
  
  registration(): Promise<any> {
    return this.http.post(this.LOCAL_API_URL + '/registration',{}).toPromise()
  }

  deactivation(): Promise<any> {
    return this.http.post(this.LOCAL_API_URL + '/deactivation',{}).toPromise()
  }
  
}
