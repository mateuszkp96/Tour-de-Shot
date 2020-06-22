import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {UserHistoryToAdd} from '../models/UserHistoryToAdd';

@Injectable({
  providedIn: 'root'
})
export class UserHistoryService {

  readonly HARDCODE_USERHISTORY;
  readonly HISTORY_API_URL;

  constructor(private http: HttpClient) {
    this.HISTORY_API_URL = environment.historyApiUrl
  }

  getUserHistory(userId: string): Promise<any> {
    return this.http.get(this.HISTORY_API_URL + "/userhistory/"+ userId).toPromise()
  }

  addUserHistory(userId: string, userHistoryToAdd: UserHistoryToAdd): Promise<any> {
    return this.http.post(this.HISTORY_API_URL + "/summary/" + userId, userHistoryToAdd).toPromise()
  }

}
