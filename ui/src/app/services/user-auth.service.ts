import {Injectable} from '@angular/core';
import decode from 'jwt-decode';
import {tokenNotExpired} from 'angular2-jwt';
import {HttpRequest} from '@angular/common/http';
import {AuthService} from 'angularx-social-login';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  cachedRequests: Array<HttpRequest<any>> = [];
  idToken: any;
 
  constructor(private authService: AuthService) {
    this.authService.authState.subscribe(authService => this.idToken = authService.idToken)
  }

  public getToken(): string {
    return this.getToken()
  }

  public isAuthenticated(): boolean {
    const token = this.getToken();
    // return a boolean reflecting
    // whether or not the token is expired
    return tokenNotExpired(null, token);

  }

  public collectFailedRequest(request): void {
    this.cachedRequests.push(request);
  }

  public retryFailedRequests(): void {
    // retry the requests. this method can
    // be called after the token is refreshed
  }
}
